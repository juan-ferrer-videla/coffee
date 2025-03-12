"use client";
import React from "react";
import { CldImage } from "next-cloudinary";

type CardInstructor = {
  instructorImg: string,
  instructor: string,
  instructorDescription: string,
}

export const InstructorCard: React.FC<CardInstructor> = ({
  instructorImg,
  instructor,
  instructorDescription,
}) => {
  return (
    <>
      <div className="flex w-full lg:w-1/3 flex-col items-center text-center">
        {/* Imagen circular del instructor */}
        <div className="mb-4 h-40 w-40">
          <CldImage
            src={instructorImg}
            alt={instructor}
            className="rounded-full object-cover"
            width={160}
            height={160}
          />
        </div>

        {/* Detalles del instructor */}
        <div className="mb-6 lg:mb-0">
          <h2 className="text-xl font-bold">{instructor}</h2>
          <p className="text-base">{instructorDescription}</p>
        </div>
      </div>
    </>
  );
};
