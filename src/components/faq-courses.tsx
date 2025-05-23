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
          ¿Cómo puedo realizar una compra?
        </AccordionTrigger>
        <AccordionContent className="xl:text-base">
          Para comprar, simplemente agregá los productos que desees al carrito
          desde nuestra tienda online. Luego, seleccioná tu opción de envío y
          presioná el botón &quot;Comprar&quot; para finalizar el pedido.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="xl:text-lg">
          ¿Es necesario estar registrado para comprar?
        </AccordionTrigger>
        <AccordionContent className="xl:text-base">
          Sí, tanto para visualizar los productos como para realizar una compra,
          es necesario estar registrado en nuestra plataforma.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="xl:text-lg">
          ¿Cómo funcionan los envíos?
        </AccordionTrigger>
        <AccordionContent className="xl:text-base">
          Ofrecemos dos modalidades. Envío a domicilio: tiene un costo de
          $10.000 a cualquier parte de Argentina. Si tu compra supera los
          $80.000, el envío es gratuito. Retiro en depósito: podés retirar tu
          pedido sin costo desde nuestro depósito en San Telmo.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="xl:text-lg">
          ¿Qué métodos de pago aceptan?
        </AccordionTrigger>
        <AccordionContent className="xl:text-base">
          Trabajamos con la pasarela de pagos de MercadoPago, donde podés abonar
          con tu cuenta de MercadoPago o con tarjetas de crédito y débito
          habilitadas.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="xl:text-lg">
          ¿Cómo puedo consultar el estado de mi envío?
        </AccordionTrigger>
        <AccordionContent className="xl:text-base">
          Podés seguir el estado de tu pedido desde tu perfil en nuestra web.
          Además, te enviaremos un correo electrónico con la información de
          seguimiento una vez que el pedido haya sido despachado.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger className="xl:text-lg">
          ¿Los eventos son arancelados?
        </AccordionTrigger>
        <AccordionContent className="xl:text-base">
          La mayoría de nuestros eventos son gratuitos. Sin embargo, algunos
          pueden tener un costo de entrada según el tipo de instalaciones y
          servicios que se ofrezcan.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
