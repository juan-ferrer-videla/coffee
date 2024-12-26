import { auth } from "../auth";
import { SignIn } from "./sign-in";
import { SignOut } from "./sign-out";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";

export async function User() {
  const session = await auth();
  const name = session?.user?.name;
  const email = session?.user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {name && <DropdownMenuLabel>{name}</DropdownMenuLabel>}
        {email && (
          <DropdownMenuLabel className="text-muted-foreground">
            {email}
          </DropdownMenuLabel>
        )}
        {!session?.user ? <SignIn /> : <SignOut />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
