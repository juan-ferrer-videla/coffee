import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function CoursesPage() {
  return (
    <>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        Cursos
      </h1>
      <nav>
        <ul className="mt-10 flex items-center justify-center space-x-5">
          <li>
            <Button asChild>
              <Link href={"/admin/courses/presential"}>Presencial</Link>
            </Button>
          </li>
          <li>
            <Button asChild>
              <Link href={"/admin/courses/remote"}>Remoto</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
