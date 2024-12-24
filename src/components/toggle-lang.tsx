"use client";

import * as React from "react";
import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TLocale } from "@/i18n";
import { useRouter, usePathname, useParams } from "next/navigation";

export function ToggleLang() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLang = params?.lang;
  if (!currentLang) return null;

  const changeLocale = (lang: TLocale) => {
    if (pathname.startsWith(`/${lang}`)) return;
    router.push(`/${lang}${pathname.slice(currentLang.length + 1)}`, {
      scroll: false,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            changeLocale("en");
          }}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            changeLocale("es");
          }}
        >
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
