"use client";

import { useDictionary } from "@/hooks/useDictionary";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps, FC } from "react";

const links = [
  { path: "/products", title: "Products" },
  { path: "/orders", title: "Orders" },
  { path: "/events", title: "Eventos" },
];

export const Nav: FC<ComponentProps<"nav">> = (props) => {
  const dictionary = useDictionary();
  const pathname = usePathname();
  return (
    <nav {...props}>
      <ul className="flex items-center gap-6">
        {links.map(({ path, title }) => (
          <li key={path}>
            <Link
              className={cn(
                "transition-colors hover:text-foreground",
                pathname.endsWith(path)
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
              href={`/${dictionary.lang}/admin${path}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
