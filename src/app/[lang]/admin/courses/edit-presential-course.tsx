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
import { editPresentialCourse } from "@/_actions/actions";
import { Textarea } from "@/components/ui/textarea";
import { SelectPresencialCourse } from "@/db/schema";
import { useState } from "react";
import { Submit } from "@/components/submit";

export const EditPresentialCourse = ({
  title,
  description,
  content,
  id,
  initialDate,
  instructor,
  instructorDescription,
  instructorImg,
  location,
  price,
  schedule,
  vacancies,
}: SelectPresencialCourse) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await editPresentialCourse(formData);
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
            <Label htmlFor="initialDate">Fecha</Label>
            <Input
              id="initialDate"
              name="initialDate"
              placeholder="15 de Enero, 2025"
              required
              defaultValue={initialDate}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="vacancies">Vacantes</Label>
            <Input
              type="number"
              id="vacancies"
              name="vacancies"
              placeholder="15 de Enero, 2025"
              required
              defaultValue={vacancies}
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
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="schedule">Horarios</Label>
            <Textarea
              id="schedule"
              name="schedule"
              placeholder="15 de Enero, 2025"
              required
              rows={4}
              defaultValue={schedule}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              name="location"
              placeholder="15 de Enero, 2025"
              required
              defaultValue={location}
            />
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
          <input type="hidden" name="id" value={id} required />
          <div>
            <Submit />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
