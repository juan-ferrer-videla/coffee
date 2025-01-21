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
import { Badge } from "./ui/badge";

export const CourseCard: React.FC<SelectPresencialCourse> = ({
  id,
  title,
  description,
  price,
  img,
}) => {
  console.log("img", img);
  return (
    <Card className="flex flex-col lg:flex-row">
      <CardHeader className="w-full flex-shrink-0 p-2 lg:w-1/3">
        <div className="relative h-48 w-full lg:h-full">
          <CldImage
            key={id}
            alt={title}
            className="rounded-xl object-cover"
            src={img}
            fill
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-4">
        <CardTitle className="mb-2 text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="mb-1 text-base">
          <p className="mb-3 line-clamp-4 text-sm">{description}</p>
          <Badge>Presencial</Badge>
        </CardDescription>
        <CardFooter className="mt-auto p-0">
          <div>
            <p className="mb-4 mt-auto w-min rounded py-1 text-lg font-bold">
              {currency.format(price)}
            </p>
            <Button className="mt-auto">Adquirir</Button>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
