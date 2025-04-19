"use client";

import { TDictionary } from "@/get-dictionary";
import { useDictionary } from "@/hooks/useDictionary";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { type ComponentProps, type FC } from "react";

export const getMainLinks = ({ home, store, events }: TDictionary) => {
  const links = [
    { path: "", title: home },
    { path: "/store", title: store },
    { path: "/events", title: events },  
  ];

  return links;
};

export const Nav: FC<ComponentProps<"nav">> = ({ className, ...rest }) => {
  const dictionary = useDictionary();
  const links = getMainLinks(dictionary);
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
