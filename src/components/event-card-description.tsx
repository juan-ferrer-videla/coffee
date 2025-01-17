"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectEvent } from "@/db/schema";
import { CldImage } from "next-cloudinary";

export const EventCardDesc: React.FC<SelectEvent> = ({
  title,
  description,
  img,
  date,
  id,
}) => {
  return (
    <Card className="mb-4 flex transform flex-col lg:flex-row">
      <CardHeader className="w-full flex-shrink-0 p-2 lg:w-1/3">
        <div className="relative h-48 w-full lg:h-full">
          <CldImage
            key={id}
            alt={title}
            className="object-cover"
            src={img}
            fill
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-4">
        <CardTitle className="mb-2 text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="mb-1 text-base">
          <p>{description}</p>
        </CardDescription>
        <CardFooter className="ml-auto mt-auto flex p-0">
          <p>{date}</p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
