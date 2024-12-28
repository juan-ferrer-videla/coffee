"use server";

import { signIn, signOut } from "./auth";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { adminsTable, productsTable, usersTable } from "./db/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const productSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.string(),
  img: z.string().optional(),
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
  const data = { price: Number(price), ...rest };
  await db.insert(productsTable).values(data);
  revalidatePath("/");
};

export const getProducts = async () => {
  return await db.select().from(productsTable);
};
