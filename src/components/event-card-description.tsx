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
import { getParsedDate } from "@/lib/utils";
import { CldImage } from "next-cloudinary";

export const EventCardDesc: React.FC<SelectEvent> = ({
  title,
  description,
  img,
  date,
  id,
}) => {
  const descriptionArray = description.replace(/\r/g, "").split("\n");
  return (
    <Card className="mb-4 flex transform flex-col lg:flex-row">
      <CardHeader className="w-full flex-shrink-0 p-2 lg:w-1/3 lg:h-[350px] md:h-[450px] sm:h-[150px]">
        <div className="relative h-[18rem] md:h-[32rem] w-full lg:h-full">
          <CldImage
            key={id}
            alt={title}
            src={img}
            fill
            className="rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-4">
        <CardTitle className="mb-2 text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="mb-1 text-base">
          {descriptionArray.map((description, i) => {
            if (description === "") return <br key={i} />;
            return <p key={i}>{description}</p>;
          })}
        </CardDescription>
        <CardFooter className="ml-auto mt-auto flex p-0">
          <p>{getParsedDate(date)}</p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
