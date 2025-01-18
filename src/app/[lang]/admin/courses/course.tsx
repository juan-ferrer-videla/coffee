"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CldImage } from "next-cloudinary";
import { SelectPresencialCourse } from "@/db/schema";
import { currency } from "@/lib/utils";
import { DeletePresentialCourse } from "./delete-presential-course";
import { EditPresentialCourse } from "./edit-presential-course";

export const PresentialCourse = (course: SelectPresencialCourse) => {
  const {
    id,
    description,
    instructorImg,
    img,
    initialDate,
    content,
    instructor,
    instructorDescription,
    location,
    price,
    schedule,
    vacancies,
    title,
  } = course;
  return (
    <Card className="mb-4 flex transform flex-col lg:flex-row" key={id}>
      <CardHeader className="w-full flex-shrink-0 p-2 lg:w-1/3">
      <div className="relative h-48 w-full lg:h-full">
        <CldImage
          key={id}
          alt={title}
          className="object-cover rounded-xl"
          src={img}
          fill
        />
      </div>
      </CardHeader>
      <CardContent className="flex flex-col p-4">
      <CardTitle className="mb-2 text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="mb-1 text-base">{description}</CardDescription>
        <CardDescription>Vacantes: {vacancies}</CardDescription>
        <p>Intructor: {instructor}</p>
        <p className="text-muted-foreground">{instructorDescription}</p>
        <p>{schedule}</p>
        <p>{currency.format(price)}</p>
        <p>{location}</p>
        <p>{initialDate}</p>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <div className="items flex justify-end space-x-4">
          <EditPresentialCourse {...course} />
          <DeletePresentialCourse id={id} img={instructorImg} />
        </div>
      </CardFooter>
    </Card>
  );
};
