"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const Submit = ({ text = "Enviar" }: { text?: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button className="justify-self-end" disabled={pending}>
      {pending ? "Cargando..." : text}
    </Button>
  );
};
