import Image from "next/image";
import imgOwner from "@/assets/us1.jpg";
import imgOwner2 from "@/assets/us2.jpg";

export const AboutUsCard: React.FC = () => {
    return (
      <div className="mt-6 flex flex-wrap justify-evenly gap-6">
        {/* Primera tarjeta */}
        <div className="flex max-w-lg shadow-lg rounded-lg overflow-hidden w-full md:w-[48%] lg:w-[30%] transform-gpu hover:scale-110 transition-transform duration-300">
          <Image src={imgOwner} alt="Owner" className="w-1/3 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold">Nicolas Piñol</h2>
            <p className="text-base">
              Founder and CEO of Amazing Website. Passionate about innovation and
              creating unique experiences.
            </p>
          </div>
        </div>
  
        {/* Segunda tarjeta */}
        <div className="flex max-w-lg shadow-2xl rounded-lg overflow-hidden w-full md:w-[48%] lg:w-[30%] transform-gpu hover:scale-110 transition-transform duration-300">
          <Image src={imgOwner2} alt="Owner" className="w-1/3 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-bold">Martin Gutierrez</h2>
            <p className="text-base">
              Founder and CEO of Amazing Website. Passionate about innovation and
              creating unique experiences.
            </p>
          </div>
        </div>
      </div>
    );
  };

