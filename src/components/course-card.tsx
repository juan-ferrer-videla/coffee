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
import { currency } from "@/lib/utils";
import { CldImage } from "./cld-image";
import { Badge } from "./ui/badge";
import { useDictionary } from "@/hooks/useDictionary";

export type CourseCardProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
  showPrice?: boolean;
  type?: string;
};

export const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  price,
  img,
  showPrice = true,
  type,
}) => {
  const { more_info, on_site } = useDictionary();
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
      <CardContent className="flex w-full flex-col p-4">
        <CardTitle className="mb-2 text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="mb-3 text-base">
          <p className="mb-3 line-clamp-4 text-sm">{description}</p>
          {type === "presential" ? (
            <Badge className="text-base">{on_site}</Badge>
          ) : (
            <Badge className="text-base">Virtual</Badge>
          )}
        </CardDescription>
        <CardFooter className="ml-auto mt-auto flex items-center gap-x-4 p-0">
          {showPrice && (
            <p className="w-min rounded text-lg font-bold">
              {currency.format(price)}
            </p>
          )}
          <Button className="text-base">{more_info}</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
