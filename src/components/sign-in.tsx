"use client";

import { Button } from "./ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { signInAction } from "@/actions";

export function SignIn() {
  const { sign_in } = useDictionary();
  return (
    <form action={signInAction}>
      <Button type="submit" variant={"ghost"} className="w-full">
        {sign_in}
      </Button>
    </form>
  );
}
