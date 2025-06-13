"use client";
import Link from "next/link";
import { useDictionary } from "@/hooks/useDictionary";

export const GoProfile = ({ id }: { id: string }) => {
  const { go_to_profile } = useDictionary();

  return <Link href={`/profile/${id}`}>{go_to_profile}</Link>;
};
