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
import { editRemoteCourse } from "@/_actions/actions";
import { Textarea } from "@/components/ui/textarea";
import { SelectRemoteCourse } from "@/db/schema";
import { useState } from "react";
import { Submit } from "@/components/submit";

export const EditRemoteCourse = ({
  title,
  description,
  content,
  id,
  img,
  instructor,
  instructorDescription,
  instructorImg,
  price,
}: SelectRemoteCourse) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await editRemoteCourse(formData);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-auto sm:max-w-screen-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form action={handleAction} className="align-start mb-6 grid gap-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Titulo</Label>
            <Input
              id="title"
              name="title"
              placeholder="Evento de ..."
              required
              defaultValue={title}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Este producto es utilizado para..."
              rows={4}
              required
              defaultValue={description}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="price">Precio</Label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="15 de Enero, 2025"
              required
              defaultValue={price}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="edit_picture">Imagen</Label>
            <Input id="edit_picture" type="file" name="img" accept="image/*" />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="instructor">Nombre del instructor</Label>
            <Input
              id="instructor"
              name="instructor"
              placeholder="15 de Enero, 2025"
              required
              defaultValue={instructor}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="instructorDescription">
              Descripción del instructor
            </Label>
            <Textarea
              id="instructorDescription"
              name="instructorDescription"
              placeholder="Este producto es utilizado para..."
              rows={4}
              required
              defaultValue={instructorDescription}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image">Imagen del instructor</Label>
            <Input
              id="image"
              type="file"
              name="instructorImg"
              accept="image/*"
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Este producto es utilizado para..."
              rows={4}
              required
              defaultValue={content}
            />
          </div>
          <input type="hidden" name="publicId" value={instructorImg} required />
          <input type="hidden" name="imgPublicId" value={img} required />
          <input type="hidden" name="id" value={id} required />
          <div>
            <Submit />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
