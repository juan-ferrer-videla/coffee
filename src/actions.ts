"use server";

import { auth, signIn, signOut } from "./auth";
import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  adminsTable,
  productsTable,
  SelectUserToProduct,
  usersTable,
  usersToProducts,
} from "./db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { redirect } from "next/navigation";

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadEndpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;

const getSignature = () => {
  const timestamp = Math.round(Date.now() / 1000).toString();
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "universo-coffee" },
    cloudinaryConfig.api_secret!,
  );
  return { timestamp, signature };
};

const uploadImage = async ({
  file,
  signature,
  timestamp,
  folder = "universo-coffee",
}: {
  file: File;
  signature: string;
  timestamp: string;
  folder?: string;
}) => {
  const cloudinaryFormData = new FormData();
  cloudinaryFormData.append("file", file);
  cloudinaryFormData.append(
    "api_key",
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  );
  cloudinaryFormData.append("signature", signature);
  cloudinaryFormData.append("timestamp", timestamp);
  cloudinaryFormData.append("folder", folder);

  const response = await fetch(uploadEndpoint, {
    method: "POST",
    body: cloudinaryFormData,
  });

  if (!response.ok) return;

  const cldData = await response.json();

  const publicId = cldData?.public_id;

  if (typeof publicId !== "string") return;
  return publicId;
};

const productSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.string(),
  img: z.instanceof(File),
});

const editProductSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  img: z.instanceof(File).optional(),
  publicId: z.string(),
  id: z.string(),
});

export const signInAction = async (formData: FormData) => {
  const redirectPath = formData.get("redirect");
  await signIn(
    "google",
    typeof redirectPath === "string" && redirectPath
      ? { redirectTo: redirectPath }
      : {},
  );
};

export const signOutAction = async () => {
  await signOut();
};

export const getUsers = async () => {
  return db.select().from(usersTable);
};

export const logIn = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (user.length === 0) await db.insert(usersTable).values({ email, name });
};

export const isAdmin = async (email: string) => {
  return (
    (await db.select().from(adminsTable).where(eq(adminsTable.email, email)))
      .length !== 0
  );
};

export const createProduct = async (formData: FormData) => {
  const { price, ...rest } = productSchema.parse(Object.fromEntries(formData));
  const { img, ...data } = { price: Number(price), ...rest };

  const file = img as File;

  let publicId = "";

  if (file.size) {
    const { signature, timestamp } = getSignature();
    const id = await uploadImage({ file, signature, timestamp });
    publicId = id ?? "";
  }

  await db.insert(productsTable).values({ img: publicId, ...data });
  revalidatePath("/");
};

export const getProducts = async () => {
  return await db.select().from(productsTable);
};

export const deleteProduct = async (formData: FormData) => {
  const { id, img } = z
    .object({ id: z.string(), img: z.string() })
    .parse(Object.fromEntries(formData));

  await Promise.all([
    db.delete(productsTable).where(eq(productsTable.id, parseInt(id))),
    cloudinary.uploader.destroy(img),
  ]);

  revalidatePath("/");
};

export const editProduct = async (formData: FormData) => {
  const { title, id, publicId, description, img, price } =
    editProductSchema.parse(Object.fromEntries(formData));

  const file = img as File;
  let newPublicId = publicId;

  if (file.size) {
    cloudinary.uploader.destroy(publicId);
    const { signature, timestamp } = getSignature();
    const id = await uploadImage({ file, signature, timestamp });
    if (id) {
      newPublicId = id;
    }
  }

  await db
    .update(productsTable)
    .set({
      title,
      description,
      price: typeof price === "string" ? parseInt(price) : price,
      img: newPublicId,
    })
    .where(eq(productsTable.id, parseInt(id)));

  revalidatePath("/");
};

const rawBuySchema = z.object({
  rawProducts: z.string(),
});
const buySchema = z
  .object({
    productId: z.number(),
    quantity: z.number(),
  })
  .array();

export const buy = async (formData: FormData) => {
  const session = await auth();
  const email = session?.user?.email;
  if (typeof email !== "string") redirect("/sign-in?redirect=store");

  const [{ id }] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  const { rawProducts } = rawBuySchema.parse(Object.fromEntries(formData));

  const { success, data: products } = buySchema.safeParse(
    JSON.parse(rawProducts),
  );
  if (!success) return;

  await db.insert(usersToProducts).values(
    products.map(({ productId, quantity }) => ({
      productId: productId,
      userId: id,
      quantity: quantity,
    })),
  );
};

export const getOrders = async () => {
  return await db.query.usersToProducts.findMany({
    with: { product: true, user: true },
  });
};

export const changeStatus = async ({
  id,
  status,
}: {
  status: SelectUserToProduct["status"];
  id: SelectUserToProduct["id"];
}) => {
  await db
    .update(usersToProducts)
    .set({ status })
    .where(eq(usersToProducts.id, id));
  revalidatePath("/");
};
