"use client";

import { TDictionary } from "@/get-dictionary";
import { useDictionary } from "@/hooks/useDictionary";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const getMainLinks = ({ blogs, courses, home, store }: TDictionary) => [
  { path: "", title: home },
  { path: "/store", title: store },
  { path: "/courses", title: courses },
  { path: "/blogs", title: blogs },
];

export const Nav = () => {
  const dictionary = useDictionary();
  const links = getMainLinks(dictionary);
  const pathname = usePathname();
  return (
    <nav>
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
