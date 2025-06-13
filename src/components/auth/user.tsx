"use client";

import { authClient, signIn, signOut } from "@/lib/auth-client";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { GoProfile } from "../goProfile";
import { User2 } from "lucide-react";

export const User = () => {
  const { data: session, isPending } = authClient.useSession();

  const logOut = async () => await signOut();

  return (
    <>
      {session === null ? (
        <Button
          variant="outline"
          size={"icon"}
          className={"gap-2"}
          disabled={isPending}
          onClick={async () => {
            await signIn.social({
              provider: "google",
            });
          }}
        >
          <User2 className="" size={"icon"} />
          <span className="sr-only">Inciar sesión</span>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size={"icon"} className="rounded-full">
              <Avatar className="h-full w-full">
                <AvatarImage src={session.user.image ?? ""} alt="@shadcn" />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Usuario</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>{session.user.name}</DropdownMenuItem>
            <DropdownMenuItem disabled>{session.user.email}</DropdownMenuItem>

            {session.user.id && (
              <DropdownMenuItem>
                {" "}
                <GoProfile id={session.user.id} />
              </DropdownMenuItem>
            )}

            <DropdownMenuItem onClick={logOut}>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
