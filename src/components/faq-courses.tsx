import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  export const FrequentQuestions = () => {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="xl:text-lg">
            ¿Cuáles son las diferencias entre los cursos presenciales y los cursos
            virtuales?
          </AccordionTrigger>
          <AccordionContent className="xl:text-base">
            Los cursos presenciales ofrecen una experiencia práctica en nuestras
            instalaciones, donde podrás utilizar equipos profesionales y recibir
            atención personalizada del instructor. Los cursos virtuales, por otro
            lado, te permiten aprender desde la comodidad de tu hogar a través de
            clases en vivo o grabadas, dependiendo del formato del curso.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="xl:text-lg">
            ¿Necesito tener experiencia previa para inscribirme en los cursos?
          </AccordionTrigger>
          <AccordionContent className="xl:text-base">
            No necesitas experiencia previa. Ofrecemos cursos para todos los
            niveles: desde principiantes que están explorando el mundo del café,
            hasta baristas y profesionales que desean perfeccionar sus
            habilidades.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="xl:text-lg">¿Qué incluye el costo del curso?</AccordionTrigger>
          <AccordionContent className="xl:text-base">
            El costo incluye acceso a todas las lecciones del curso, materiales de
            apoyo (como guías o recetas), certificación de participación al
            completar el curso y, en el caso de los cursos presenciales, el uso de
            equipo y materiales necesarios durante las sesiones.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="xl:text-lg">
            ¿Cómo puedo inscribirme y cuáles son las formas de pago aceptadas?
          </AccordionTrigger>
          <AccordionContent className="xl:text-base">
            Para inscribirte, solo tienes que seleccionar el curso de tu interés
            en nuestra página web, hacer clic en &quot;Inscribirme&quot; y seguir los pasos
            indicados. Aceptamos pagos con tarjeta de crédito, débito,
            transferencias bancarias y plataformas de pago en línea.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="xl:text-lg">
            ¿Puedo cambiar mi inscripción o solicitar un reembolso si no puedo
            asistir?
          </AccordionTrigger>
          <AccordionContent className="xl:text-base">
            Sí, puedes cambiar tu inscripción o solicitar un reembolso, siempre y
            cuando lo hagas con al menos 10 días de anticipación antes del inicio
            del curso. Consulta nuestra política de cancelación en la página para
            más detalles.
          </AccordionContent>
        </AccordionItem >
        <AccordionItem value="item-6">
          <AccordionTrigger className="xl:text-lg">
            ¿Qué necesito para participar en un curso virtual?
          </AccordionTrigger>
          <AccordionContent className="xl:text-base">
            Para un curso virtual necesitas una conexión estable a internet, un
            dispositivo como una computadora, tableta o teléfono móvil, y, en
            algunos casos, materiales básicos que indicaremos previamente. Si el
            curso es en vivo, te enviaremos un enlace para acceder a la sesión.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };
  