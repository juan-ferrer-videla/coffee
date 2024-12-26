"use client";

import { Button } from "./ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { signOutAction } from "@/actions";

export function SignOut() {
  const { sign_out } = useDictionary();
  return (
    <form action={signOutAction}>
      <Button type="submit" variant={"ghost"} className="w-full">
        {sign_out}
      </Button>
    </form>
  );
}
