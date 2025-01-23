import Image from "next/image";
import imgOwner from "@/assets/us1.jpg";
import imgOwner2 from "@/assets/us2.jpg";

export const AboutUsCard: React.FC = () => {
  return (
    <div className="mt-6 flex flex-wrap justify-evenly gap-6">
      {/* Primera tarjeta */}
      <div className="flex w-full max-w-lg transform-gpu overflow-hidden rounded-lg shadow-lg md:w-[48%] lg:w-[48%]">
        <Image src={imgOwner} alt="Owner" className="w-1/3 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">Arq. Duarte Eduardo </h2>
          <p className="text-base">
            <strong>Presidente de Universo Coffee Argentina</strong>
            <br />
            Desarrollador Comercial e Imagen CO.
            <br />
            MANAGEMENT SENIOR PRENSA - DIFUSIÓN - EVENTOS CORPORATIVOS
          </p>
        </div>
      </div>

      {/* Segunda tarjeta */}
      <div className="flex w-full max-w-lg transform-gpu overflow-hidden rounded-lg shadow-2xl md:w-[48%] lg:w-[48%]">
        <Image src={imgOwner2} alt="Owner" className="w-1/3 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">Coffee Master Mancini Rafael</h2>
          <p className="text-base">
            <strong>CEO de Universo Coffee ARGENTINA</strong>
            <br/>
            Capacitador Técnico e Instructor Barista.  
            <br/>
            MANAGEMENT SALES ROASTER - CURSOS - CAPACITACIÓN
          </p>
        </div>
      </div>
    </div>
  );
};
