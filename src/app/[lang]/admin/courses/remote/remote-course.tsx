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
import { currency } from "@/lib/utils";
import { DeleteRemoteCourse } from "./delete-remote-course";
import { EditRemoteCourse } from "./edit-remote-course";

import { SelectRemoteCourseQuery } from "@/_actions/actions";
import { CreateModule, RemoteModule } from "./create-module";

export const RemoteCourse = (course: SelectRemoteCourseQuery[number]) => {
  const {
    id,
    description,
    instructorImg,
    img,
    content,
    instructor,
    instructorDescription,
    price,
    title,
    modules,
  } = course;
  return (
    <Card className="mb-4 flex transform flex-col lg:flex-row" key={id}>
      <CardHeader className="w-full flex-shrink-0 p-2 lg:w-1/3">
        <div className="relative h-48 w-full lg:h-full">
          <CldImage
            key={id}
            alt={title}
            className="rounded-xl object-contain"
            src={img}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-4">
        <CardTitle className="mb-2 text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="mb-1 text-base">
          {description}
        </CardDescription>
        <p>Intructor: {instructor}</p>
        <p className="text-muted-foreground">{instructorDescription}</p>
        <p>{currency.format(price)}</p>

        <p>{content}</p>
        <CreateModule remoteCourseId={id} />
        <ul className="mt-3">
          {modules.map((remoteModule) => (
            <li key={remoteModule.id}>
              <RemoteModule {...remoteModule} />
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <div className="items flex justify-end space-x-4">
          <EditRemoteCourse {...course} />
          <DeleteRemoteCourse id={id} img={instructorImg} />
        </div>
      </CardFooter>
    </Card>
  );
};
