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
    <Card className="w-full max-w-sm overflow-hidden" key={id}>
      <div className="relative aspect-video w-full">
        <CldImage
          key={id}
          alt={title}
          className="object-cover"
          src={instructorImg}
          fill
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardDescription>Vacantes: {vacancies}</CardDescription>
      </CardHeader>
      <CardContent>
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
