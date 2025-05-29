"use client";

import Image from "next/image";
import imgOwner from "@/assets/us1.jpg";
import imgOwner2 from "@/assets/us2.jpg";
import { useDictionary } from "@/hooks/useDictionary";

export const AboutUsCard = () => {
  const {
    first_about_us_title,
    first_about_us_actions,
    first_about_us_tasks,
    second_about_us_actions,
    second_about_us_tasks,
    second_about_us_title,
  } = useDictionary();

  return (
    <div className="mt-6 flex flex-wrap justify-evenly gap-6">
      {/* Primera tarjeta */}
      <div className="flex w-full max-w-lg transform-gpu overflow-hidden rounded-lg shadow-lg md:w-[48%] lg:w-[48%]">
        <Image src={imgOwner} alt="Owner" className="w-1/3 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">Arq. Duarte Eduardo </h2>
          <p className="text-base">
            <strong>{first_about_us_title}</strong>
            <br />
            {first_about_us_actions}
            <br />
            {first_about_us_tasks}
          </p>
        </div>
      </div>

      {/* Segunda tarjeta */}
      <div className="flex w-full max-w-lg transform-gpu overflow-hidden rounded-lg shadow-2xl md:w-[48%] lg:w-[48%]">
        <Image src={imgOwner2} alt="Owner" className="w-1/3 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">
            Master Coffee Argento <br /> @miyagiargentooficial
          </h2>
          <p className="text-base">
            <strong>{second_about_us_title}</strong>
            <br />
            {second_about_us_actions}
            <br />
            {second_about_us_tasks}
          </p>
        </div>
      </div>
    </div>
  );
};
