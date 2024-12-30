import { deleteProduct } from "@/actions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";

export const DeleteProduct = ({ id, img }: { id: number; img: string }) => {
  return (
    <form action={deleteProduct}>
      <input type="hidden" name="img" value={img} />
      <input type="hidden" name="id" value={id} />
      <Button size={"icon"} variant={"destructive"}>
        <Trash />
      </Button>
    </form>
  );
};
