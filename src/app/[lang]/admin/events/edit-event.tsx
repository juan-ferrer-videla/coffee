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
import { editEvent } from "@/_actions/actions";
import { Textarea } from "@/components/ui/textarea";
import { SelectEvent } from "@/db/schema";
import { useState } from "react";
import { Submit } from "@/components/submit";

export const EditEvent = ({
  description,
  id,
  img,
  date,
  title,
}: SelectEvent) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await editEvent(formData);
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
            <Label htmlFor="edit_date">Fecha</Label>
            <Input
              id="edit_date"
              name="date"
              placeholder="5000"
              defaultValue={date}
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
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="edit_picture">Picture</Label>
            <Input id="edit_picture" type="file" name="img" accept="image/*" />
          </div>
          <input type="hidden" name="publicId" value={img} required />
          <input type="hidden" name="id" value={id} required />
          <Submit />
        </form>
      </DialogContent>
    </Dialog>
  );
};
