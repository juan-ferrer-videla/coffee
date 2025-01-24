import { getUser, logIn } from "@/_actions/actions";
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
import { GoProfile } from "./goProfile";

export async function User(){
  const session = await auth();
  const name = session?.user?.name;
  const email = session?.user?.email;
  if (email && name) logIn({ email, name });
  
  const user = await getUser()
  const id = user?.id

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <User2 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col justify-center items-center">
        {name && <DropdownMenuLabel>{name}</DropdownMenuLabel>}
        {email && (
          <DropdownMenuLabel className="text-muted-foreground">
            {email}
          </DropdownMenuLabel>
        )}
        {!session?.user ? (
          <>
            <SignIn />
          </>
        ) : (
          <>
            {id && <GoProfile id={id}/>}
            <SignOut />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
