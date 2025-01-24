"use client";

import { Button } from "@/components/ui/button";
import { useDictionary } from "@/hooks/useDictionary";

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

  const {wsp_button} = useDictionary()

  return (
    <Button onClick={handleWhatsAppClick}>
     {wsp_button}
    </Button>
  );
};
