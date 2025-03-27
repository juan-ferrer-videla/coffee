"use server";

import { auth, signIn, signOut } from "../auth";
import { eq, count } from "drizzle-orm";
import { db } from "../db";
import {
  adminsTable,
  createModuleSchema,
  editEventSchema,
  editPresentialCourseSchema,
  editProductSchema,
  editRemoteCourseSchema,
  eventSchema,
  eventsTable,
  presentialCourseSchema,
  presentialCoursesTable,
  productSchema,
  productsTable,
  remoteCourseSchema,
  remoteCoursesTable,
  remoteModuleFilesTable,
  remoteModuleVideosTable,
  remoteModulesTable,
  SelectUserToProduct,
  usersTable,
  usersToPresentialCourses,
  usersToProducts,
  createModuleVideoSchema,
  createModuleFileSchema,
  createModuleQuestionSchema,
  moduleQuestionsTable,
  moduleQuestionChoicesTable,
  createModuleQuestionChoiceSchema,
  usersToRemoteCourses,
} from "../db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { CourseCardProps } from "@/components/course-card";

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

const uploadFile = async ({
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

  if (!response.ok) throw new Error("cloudinary fetch failed");

  const cldData = await response.json();
  const data = z
    .object({ secure_url: z.string(), public_id: z.string() })
    .parse(cldData);

  return data;
};

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
  const { img, isRecommended, ...data } = {
    price: Number(price),
    ...rest,
  };

  const file = img as File;

  let publicId = "";

  if (file.size) {
    const { signature, timestamp } = getSignature();
    const data = await uploadFile({ file, signature, timestamp });
    publicId = data.public_id;
  }

  await db.insert(productsTable).values({
    img: publicId,
    isRecommended: !!isRecommended,
    ...data,
  });
  revalidatePath("/");
};

export const getProducts = async (
  options: Partial<{ recommended: boolean }> = { recommended: false },
) => {
  if (!options.recommended) return await db.select().from(productsTable);
  return await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.isRecommended, options.recommended));
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
  const {
    title,
    id,
    publicId,
    description,
    img: file,
    price,
    isRecommended,
  } = editProductSchema.parse(Object.fromEntries(formData));

  let newPublicId = publicId;

  if (file?.size) {
    cloudinary.uploader.destroy(publicId);
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({ file, signature, timestamp });
    newPublicId = public_id;
  }

  await db
    .update(productsTable)
    .set({
      title,
      description,
      isRecommended: !!isRecommended,
      price: typeof price === "string" ? parseInt(price) : price,
      img: newPublicId,
    })
    .where(eq(productsTable.id, parseInt(id)));

  revalidatePath("/");
};

export const buy = async (
  items: Items[],
  { email, delivery }: { email: string; delivery: boolean },
) => {
  let userId;
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (users.length === 0) {
    const [{ id }] = await db
      .insert(usersTable)
      .values({ email, name: "" })
      .returning();
    userId = id;
  } else {
    userId = users[0].id;
  }

  await db.insert(usersToProducts).values(
    items.map(({ id: productId, quantity }) => ({
      productId: parseInt(productId),
      userId,
      quantity,
      delivery,
    })),
  );

  revalidatePath("/");
};

export const buyCourse = async ({
  userId,
  presentialCourseId,
}: {
  userId: number;
  presentialCourseId: number;
}) => {
  await db
    .insert(usersToPresentialCourses)
    .values({ userId, presentialCourseId });

  revalidatePath("/");
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

export const createEvent = async (formData: FormData) => {
  const { img: file, ...data } = eventSchema.parse(
    Object.fromEntries(formData),
  );

  let publicId = "";

  if (file.size) {
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({ file, signature, timestamp });
    publicId = public_id;
  }

  await db.insert(eventsTable).values({ img: publicId, ...data });
  revalidatePath("/");
};

export const editEvent = async (formData: FormData) => {
  const {
    title,
    id,
    publicId,
    description,
    img: file,
    date,
  } = editEventSchema.parse(Object.fromEntries(formData));

  let newPublicId = publicId;

  if (file?.size) {
    cloudinary.uploader.destroy(publicId);
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({ file, signature, timestamp });

    newPublicId = public_id;
  }

  await db
    .update(eventsTable)
    .set({
      title,
      description,
      date,
      img: newPublicId,
    })
    .where(eq(eventsTable.id, parseInt(id)));

  revalidatePath("/");
};

export const deleteEvent = async (formData: FormData) => {
  const { id, img } = z
    .object({ id: z.string(), img: z.string() })
    .parse(Object.fromEntries(formData));

  await Promise.all([
    db.delete(eventsTable).where(eq(eventsTable.id, parseInt(id))),
    cloudinary.uploader.destroy(img),
  ]);

  revalidatePath("/");
};

export const getEvents = async () => {
  return await db.select().from(eventsTable);
};

export const createPresentialCourse = async (formData: FormData) => {
  const {
    price,
    img: imgFile,
    instructorImg: file,
    vacancies,
    ...data
  } = presentialCourseSchema.parse(Object.fromEntries(formData));

  let publicId = "";
  let imgPublicId = "";

  if (file.size) {
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({ file, signature, timestamp });
    publicId = public_id;
  }

  if (imgFile.size) {
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({
      file: imgFile,
      signature,
      timestamp,
    });
    imgPublicId = public_id;
  }

  await db.insert(presentialCoursesTable).values({
    instructorImg: publicId,
    img: imgPublicId,
    price: parseInt(price),
    vacancies: parseInt(vacancies),
    ...data,
  });
  revalidatePath("/");
};

export const editPresentialCourse = async (formData: FormData) => {
  const {
    title,
    id,
    publicId,
    imgPublicId,
    description,
    img: imgFile,
    content,
    instructor,
    instructorDescription,
    location,
    price,
    schedule,
    vacancies,
    instructorImg: file,
    initialDate,
  } = editPresentialCourseSchema.parse(Object.fromEntries(formData));

  let newPublicId = publicId;
  let newImgPublicId = imgPublicId;

  if (file?.size) {
    cloudinary.uploader.destroy(publicId);
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({ file, signature, timestamp });

    newPublicId = public_id;
  }

  if (imgFile?.size) {
    cloudinary.uploader.destroy(imgPublicId);
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({
      file: imgFile,
      signature,
      timestamp,
    });

    newImgPublicId = public_id;
  }

  await db
    .update(presentialCoursesTable)
    .set({
      title,
      description,
      content,
      instructor,
      img: newImgPublicId,
      instructorDescription,
      location,
      price: parseInt(price),
      schedule,
      initialDate,
      vacancies: parseInt(vacancies),
      instructorImg: newPublicId,
    })
    .where(eq(presentialCoursesTable.id, parseInt(id)));

  revalidatePath("/");
};

export const deletePresentialCourse = async (formData: FormData) => {
  const { id, img } = z
    .object({ id: z.string(), img: z.string() })
    .parse(Object.fromEntries(formData));

  await Promise.all([
    db
      .delete(presentialCoursesTable)
      .where(eq(presentialCoursesTable.id, parseInt(id))),
    cloudinary.uploader.destroy(img),
  ]);

  revalidatePath("/");
};

export const createRemoteCourse = async (formData: FormData) => {
  const {
    price,
    img: imgFile,
    instructorImg: file,
    ...data
  } = remoteCourseSchema.parse(Object.fromEntries(formData));

  let publicId = "";
  let imgPublicId = "";

  if (file.size) {
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({ file, signature, timestamp });
    publicId = public_id;
  }

  if (imgFile.size) {
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({
      file: imgFile,
      signature,
      timestamp,
    });
    imgPublicId = public_id;
  }

  await db.insert(remoteCoursesTable).values({
    instructorImg: publicId,
    img: imgPublicId,
    price: parseInt(price),
    ...data,
  });
  revalidatePath("/");
};

export const editRemoteCourse = async (formData: FormData) => {
  const {
    title,
    id,
    publicId,
    imgPublicId,
    description,
    img: imgFile,
    content,
    instructor,
    instructorDescription,
    price,
    instructorImg: file,
  } = editRemoteCourseSchema.parse(Object.fromEntries(formData));

  let newPublicId = publicId;
  let newImgPublicId = imgPublicId;

  if (file?.size) {
    cloudinary.uploader.destroy(publicId);
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({ file, signature, timestamp });

    newPublicId = public_id;
  }

  if (imgFile?.size) {
    cloudinary.uploader.destroy(imgPublicId);
    const { signature, timestamp } = getSignature();
    const { public_id } = await uploadFile({
      file: imgFile,
      signature,
      timestamp,
    });

    newImgPublicId = public_id;
  }

  await db
    .update(remoteCoursesTable)
    .set({
      title,
      description,
      content,
      instructor,
      img: newImgPublicId,
      instructorDescription,
      price: parseInt(price),
      instructorImg: newPublicId,
    })
    .where(eq(remoteCoursesTable.id, parseInt(id)));

  revalidatePath("/");
};

export const deleteRemoteCourse = async (formData: FormData) => {
  const { id, img } = z
    .object({ id: z.string(), img: z.string() })
    .parse(Object.fromEntries(formData));

  await Promise.all([
    db
      .delete(remoteCoursesTable)
      .where(eq(remoteCoursesTable.id, parseInt(id))),
    cloudinary.uploader.destroy(img),
  ]);

  revalidatePath("/");
};

export const getPresentialCourses = async () => {
  return await db.select().from(presentialCoursesTable);
};

export const getRemoteCourses = async () => {
  return await db.query.remoteCoursesTable.findMany({
    with: {
      modules: {
        with: {
          questions: { with: { items: true } },
          files: true,
          videos: true,
        },
      },
    },
  });
};

export const getRemoteCourse = async (id: number) => {
  return await db.query.remoteCoursesTable.findFirst({
    with: {
      modules: {
        with: {
          questions: { with: { items: true } },
          files: true,
          videos: true,
        },
        where: eq(remoteCoursesTable.id, id),
      },
    },
  });
};

export const getCourses = async (): Promise<CourseCardProps[]> => {
  const [presentialCourses, remoteCourses] = await Promise.all([
    db.select().from(presentialCoursesTable),
    db.query.remoteCoursesTable.findMany({
      with: {
        modules: {
          with: {
            questions: { with: { items: true } },
            files: true,
            videos: true,
          },
        },
      },
    }),
  ]);

  const formattedPresentialCourses = presentialCourses.map((course) => ({
    ...course,
    type: "presential",
  }));

  const formattedRemoteCourses = remoteCourses.map((course) => ({
    ...course,
    type: "remote",
  }));

  return [...formattedPresentialCourses, ...formattedRemoteCourses];
};

export const editUser = async (formData: FormData) => {
  const { id, streetNumber, dni, ...data } = z
    .object({
      id: z.string(),
      phone: z.string(),
      dni: z.string().optional(),
      postalCode: z.string().optional(),
      street: z.string().optional(),
      streetNumber: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      indications: z.string().optional(),
    })
    .parse(Object.fromEntries(formData));

  await db
    .update(usersTable)
    .set({
      streetNumber: streetNumber ? parseInt(streetNumber) : null,
      dni: dni ? parseInt(dni) : null,
      ...data,
    })
    .where(eq(usersTable.id, parseInt(id)));
  revalidatePath("/");
};

export const getUser = async () => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return;

  return await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });
};

export const getUserOrders = async (id: number) => {
  return await db.query.usersToProducts.findMany({
    with: { product: true, user: true },
    where: eq(usersToProducts.userId, id),
  });
};

export const getUserPresentialCourses = async (id: number) => {
  return await db.query.usersToPresentialCourses.findMany({
    with: { presentialCourses: true, user: true },
    where: eq(usersToPresentialCourses.userId, id),
  });
};

export const getPresentialCoursesVacancies = async () => {
  const result = await db
    .select({ count: count() })
    .from(usersToPresentialCourses);

  return result[0]?.count || 0;
};

export const getUsersToPresentialCourses = async () => {
  return await db.query.usersToPresentialCourses.findMany({
    with: { presentialCourses: true, user: true },
  });
};

export const getUsersToRemoteCourses = async () => {
  return await db.query.usersToRemoteCourses.findMany({
    with: { remoteCourses: true, user: true },
  });
};

export const getUserRemoteCourses = async (id: number) => {
  return await db.query.usersToRemoteCourses.findMany({
    with: { remoteCourses: true, user: true },
    where: eq(usersToRemoteCourses.userId, id),
  });
};

export const createModule = async (formData: FormData) => {
  const { remoteCourseId, ...data } = createModuleSchema.parse(
    Object.fromEntries(formData),
  );

  await db.insert(remoteModulesTable).values({
    remoteCourseId: parseInt(remoteCourseId),
    ...data,
  });
  revalidatePath("/");
};

export const deleteModule = async (formData: FormData) => {
  const { id } = z
    .object({ id: z.string() })
    .parse(Object.fromEntries(formData));

  await db
    .delete(remoteModulesTable)
    .where(eq(remoteModulesTable.id, parseInt(id)));

  revalidatePath("/");
};

export const createModuleVideo = async (formData: FormData) => {
  const { remoteModuleId, ...data } = createModuleVideoSchema.parse(
    Object.fromEntries(formData),
  );

  await db.insert(remoteModuleVideosTable).values({
    remoteModuleId: parseInt(remoteModuleId),
    ...data,
  });
  revalidatePath("/");
};

export const deleteModuleVideo = async (formData: FormData) => {
  const { id } = z
    .object({ id: z.string() })
    .parse(Object.fromEntries(formData));

  await db
    .delete(remoteModuleVideosTable)
    .where(eq(remoteModuleVideosTable.id, parseInt(id)));

  revalidatePath("/");
};

export const createModuleFile = async (formData: FormData) => {
  const { remoteModuleId, file, ...data } = createModuleFileSchema.parse(
    Object.fromEntries(formData),
  );

  if (!file.size) throw new Error("The file provided has no size");

  const { signature, timestamp } = getSignature();
  const { public_id, secure_url } = await uploadFile({
    file,
    signature,
    timestamp,
  });

  await db.insert(remoteModuleFilesTable).values({
    remoteModuleId: parseInt(remoteModuleId),
    file: public_id,
    url: secure_url,
    ...data,
  });
  revalidatePath("/");
};

export const deleteModuleFile = async (formData: FormData) => {
  const { id, fileId } = z
    .object({ id: z.string(), fileId: z.string() })
    .parse(Object.fromEntries(formData));

  await Promise.all([
    db
      .delete(remoteModuleFilesTable)
      .where(eq(remoteModuleFilesTable.id, parseInt(id))),
    cloudinary.uploader.destroy(fileId),
  ]);

  revalidatePath("/");
};

export const createModuleQuestion = async (formData: FormData) => {
  const { remoteModuleId, ...data } = createModuleQuestionSchema.parse(
    Object.fromEntries(formData),
  );

  await db.insert(moduleQuestionsTable).values({
    remoteModuleId: parseInt(remoteModuleId),
    ...data,
  });
  revalidatePath("/");
};

export const deleteModuleQuestion = async (formData: FormData) => {
  const { id } = z
    .object({ id: z.string() })
    .parse(Object.fromEntries(formData));

  await db
    .delete(moduleQuestionsTable)
    .where(eq(moduleQuestionsTable.id, parseInt(id)));
  revalidatePath("/");
};

export const createModuleQuestionChoice = async (formData: FormData) => {
  const { moduleQuestionId, ...data } = createModuleQuestionChoiceSchema.parse(
    Object.fromEntries(formData),
  );

  await db.insert(moduleQuestionChoicesTable).values({
    moduleQuestionId: parseInt(moduleQuestionId),
    ...data,
  });
  revalidatePath("/");
};

export const deleteModuleQuestionChoice = async (formData: FormData) => {
  const { id } = z
    .object({ id: z.string() })
    .parse(Object.fromEntries(formData));

  await db
    .delete(moduleQuestionChoicesTable)
    .where(eq(moduleQuestionChoicesTable.id, parseInt(id)));
  revalidatePath("/");
};

export type SelectRemoteCourseQuery = Awaited<
  ReturnType<typeof getRemoteCourses>
>;
