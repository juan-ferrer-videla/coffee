"use client";

import {
  createModule,
  createModuleFile,
  SelectRemoteCourseQuery,
} from "@/_actions/actions";
import { Submit } from "@/components/submit";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { File, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const RemoteModule = ({
  files,
  id,
  title,
}: SelectRemoteCourseQuery[number]["modules"][number]) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await createModuleFile(formData);
    setOpen(false);
  };
  console.log(files);
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <ul className="mb-8">
            {files.map(({ title, id, file }) => (
              <li key={id} className="mb-2">
                <a href={file} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center">
                    <File className="mr-2" />
                    <span>{title}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="self-start">
                <Plus />
                Añadir archivo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crea un nuevo archivo</DialogTitle>
                <DialogDescription>
                  Elegi un titulo a tu preferencia
                </DialogDescription>
              </DialogHeader>

              <form
                action={handleAction}
                className="align-start mb-6 grid gap-6 sm:mb-10 md:mb-16"
              >
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Titulo</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Nombre del archivo ..."
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="price">Archivo</Label>
                  <Input id="file" type="file" name="file" required />
                </div>
                <input type="hidden" name="remoteModuleId" value={id} />

                <div>
                  <Submit text="Crear" />
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const CreateModule = ({
  remoteCourseId,
}: {
  remoteCourseId: number;
}) => {
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: FormData) => {
    await createModule(formData);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-start">
          <Plus />
          Añadir modulo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crea un nuevo modulo</DialogTitle>
          <DialogDescription>
            Elegi un titulo a tu preferencia
          </DialogDescription>
        </DialogHeader>
        <form action={handleAction} className="align-start grid gap-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Titulo</Label>
            <Input id="title" name="title" placeholder="Modulo ..." required />
          </div>
          <input type="hidden" name="remoteCourseId" value={remoteCourseId} />

          <div>
            <Submit text="Crear" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
