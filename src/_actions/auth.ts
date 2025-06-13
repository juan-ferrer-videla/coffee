"use server";

import { db } from "@/db";
import { adminsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>;

export const validateAdmin = async (email: string): Promise<boolean> => {
  return !!(await db.query.adminsTable.findFirst({
    where: eq(adminsTable.email, email),
  }));
};
