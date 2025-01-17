"use client";

import { Button } from "@/components/ui/button";

interface ContactButtonProps {
  phoneNumber: string;
  message: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  phoneNumber,
  message,
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Button onClick={handleWhatsAppClick}>
      ¿Querés realizar un evento con nosotros? ¡Contactanos!
    </Button>
  );
};
