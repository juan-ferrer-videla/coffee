"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import img1 from "@/assets/banner1.jpg";
import img2 from "@/assets/banner2.jpg";
import img3 from "@/assets/banner3.jpg";

const images = [img1, img2, img3];

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

export function BannerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mb-8 w-full sm:mb-12 md:mb-16"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play()}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="relative flex aspect-[16/7] items-center justify-center p-6">
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="rounded object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
