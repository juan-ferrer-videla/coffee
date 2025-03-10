import { createPresentialCourse } from "@/_actions/actions";
import { Submit } from "@/components/submit";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React from "react";

export const CreateCourse = () => {
  return (
    <form
      action={createPresentialCourse}
      className="align-start mb-6 grid gap-6 sm:mb-10 md:mb-16"
    >
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="title">Titulo</Label>
        <Input id="title" name="title" placeholder="Curso de ..." required />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="introVideoURL">Video de introduccion URL</Label>
        <Input
          id="introVideoURL"
          name="introVideoURL"
          placeholder="https://www.youtube.com/embed/Nnxx..."
          required
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Escribe tu descripcion aqui..."
          rows={4}
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="initialDate">Fecha</Label>
        <Input
          id="initialDate"
          name="initialDate"
          placeholder="15 de Enero, 2025"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="vacancies">Vacantes</Label>
        <Input
          type="number"
          id="vacancies"
          name="vacancies"
          placeholder="100"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="price">Precio</Label>
        <Input
          type="number"
          id="price"
          name="price"
          placeholder="2500"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="price">Imagen</Label>
        <Input id="image" type="file" name="img" accept="image/*" required />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="schedule">Horarios</Label>
        <Textarea
          id="schedule"
          name="schedule"
          placeholder="8:15hs a 20:00hs"
          required
          rows={4}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="location">Ubicación</Label>
        <Input
          id="location"
          name="location"
          placeholder="Mendoza, Ciudad, San martin 123"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="instructor">Nombre del instructor</Label>
        <Input
          id="instructor"
          name="instructor"
          placeholder="Juan Ferrer"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="instructorDescription">
          Descripción del instructor
        </Label>
        <Textarea
          id="instructorDescription"
          name="instructorDescription"
          placeholder="Escribe la descripción aquí..."
          rows={4}
          required
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="image">Imagen del instructor</Label>
        <Input
          id="image"
          type="file"
          name="instructorImg"
          accept="image/*"
          required
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="content">Contenido</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Escribe mas info sobre el curso..."
          rows={4}
          required
        />
      </div>
      <div>
        <Submit />
      </div>
    </form>
  );
};
