"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useDictionary } from "@/hooks/useDictionary";

export const GoProfile = ({id}: {id: number}) => {
  const { go_to_profile } = useDictionary();

  return (
    <Link href={`/profile/${id}`}>
      <Button type="submit" variant={"ghost"} className="w-full">
        {go_to_profile}
      </Button>
    </Link>
  );
};
