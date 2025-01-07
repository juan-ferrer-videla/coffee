"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editProduct } from "@/_actions/actions";
import { Textarea } from "@/components/ui/textarea";
import { SelectProduct } from "@/db/schema";
import { useState } from "react";
import { Submit } from "@/components/submit";
import { Checkbox } from "@/components/ui/checkbox";

export const EditProduct = ({
  description,
  id,
  img,
  price,
  title,
  isRecommended,
}: SelectProduct) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await editProduct(formData);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form action={handleAction} className="grid max-w-sm gap-6">
          <div className="w-fullitems-center grid gap-1.5">
            <Label htmlFor="edit_title">Title</Label>
            <Input
              id="edit_title"
              name="title"
              placeholder="Cogollo"
              defaultValue={title}
              required
            />
          </div>
          <div className="w-fullitems-center grid gap-1.5">
            <Label htmlFor="edit_description">Description</Label>
            <Textarea
              id="edit_description"
              name="description"
              placeholder="Este producto es utilizado para..."
              rows={4}
              defaultValue={description ?? ""}
            />
          </div>
          <div className="w-fullitems-center grid gap-1.5">
            <Label htmlFor="edit_price">Price</Label>
            <Input
              type="number"
              id="edit_price"
              name="price"
              placeholder="5000"
              defaultValue={price}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="edit_picture">Picture</Label>
            <Input id="edit_picture" type="file" name="img" accept="image/*" />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="edit_is_recommended"
              defaultChecked={isRecommended}
              name="isRecommended"
            />
            <label
              htmlFor="edit_is_recommended"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Es recomendado
            </label>
          </div>
          <input type="hidden" name="publicId" value={img} required />
          <input type="hidden" name="id" value={id} required />
          <Submit />
        </form>
      </DialogContent>
    </Dialog>
  );
};
