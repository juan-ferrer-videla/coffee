"use client";

import { TDictionary } from "@/get-dictionary";
import { useDictionary } from "@/hooks/useDictionary";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, {FC } from "react";
import { HTMLAttributes } from "react";

type NavbarProps = HTMLAttributes<HTMLElement> & {
  hasCourses: boolean;
};

export const getMainLinks = (
  { courses, home, store, my_courses }: TDictionary,
  hasCourses: boolean = false,
) => {
  const links = [
    { path: "", title: home },
    { path: "/store", title: store },
    { path: "/courses", title: courses },
  ];

  if (hasCourses) {
    links.push({ path: "/my-courses", title: my_courses });
  }

  return links;
};

export const Nav: FC<NavbarProps> = ({
  className,
  hasCourses,
  ...rest
}: NavbarProps) => {
  const dictionary = useDictionary();
  const links = getMainLinks(dictionary, hasCourses);
  const pathname = usePathname();
  return (
    <nav className={cn(className)} {...rest}>
      <ul className="flex items-center gap-6">
        {links.map(({ path, title }) => (
          <li key={path}>
            <Link
              className={cn(
                "transition-colors hover:text-foreground",
                pathname === `/${dictionary.lang}${path}`
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
              href={`/${dictionary.lang}${path}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
