"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectPresencialCourse } from "@/db/schema";
import { currency } from "@/lib/utils";
import { CldImage } from "./cld-image";

export const CourseCard: React.FC<SelectPresencialCourse> = ({
  id,
  title,
  description,
  price,
  img,
}) => {
  console.log("img", img)
  return (
    <Card className="mb-4 flex transform flex-col transition-transform duration-300 hover:scale-105 lg:flex-row">
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
        <CardDescription className="mb-1 text-base">
          <p className="line-clamp-4">{description}</p>
          <p className="mb-1 mt-2 w-min rounded bg-green-600 px-2 py-1 text-sm font-semibold text-white">
            Presencial
          </p>
        </CardDescription>
        <CardFooter className="ml-auto mt-auto flex p-0">
          <p className="mr-2 mt-auto w-min justify-end rounded bg-customYellow px-3 py-1 text-lg font-bold text-black shadow">
            {currency.format(price)}
          </p>
          <Button variant="secondary" className="mt-auto">
            Adquirir
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
