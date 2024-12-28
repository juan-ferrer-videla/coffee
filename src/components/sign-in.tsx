"use client";

import { Button, ButtonProps } from "./ui/button";
import { useDictionary } from "@/hooks/useDictionary";
import { signInAction } from "@/actions";
import { cn } from "@/lib/utils";

export const SignIn = ({
  variant,
  className,
  redirect = "",
}: ButtonProps & { redirect?: string }) => {
  const { sign_in } = useDictionary();
  return (
    <form action={signInAction}>
      <input type="hidden" name="redirect" value={redirect} />
      <Button
        type="submit"
        variant={variant ?? "ghost"}
        className={cn("w-full", className)}
      >
        {sign_in}
      </Button>
    </form>
  );
};
