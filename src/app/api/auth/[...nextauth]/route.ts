import NextAuth from "next-auth";
import { authConfig } from "@/auth";

const { handlers } = NextAuth(authConfig);

// 👇 Exportá explícitamente los métodos HTTP
export const GET = handlers.GET;
export const POST = handlers.POST;
