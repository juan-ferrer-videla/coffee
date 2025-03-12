"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CourseContentProps {
  modules: {
    id: number;
    title: string;
    items: {
      id: number;
      title: string;
      type: "video" | "pdf" | "quiz";
      resourceUrl: string;
    }[];
  }[];
}

export const CourseContent = ({ modules }: CourseContentProps) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    type: string;
    url: string;
  } | null>(null);

  const handleOpenModal = (item: {
    title: string;
    type: string;
    resourceUrl: string;
  }) => {
    setModalContent({
      title: item.title,
      type: item.type,
      url: item.resourceUrl,
    });
    setOpen(true);
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {modules.map((mod) => (
          <AccordionItem key={mod.id} value={`module-${mod.id}`}>
            <AccordionTrigger>{mod.title}</AccordionTrigger>
            <AccordionContent>
              {mod.items.map((item) => (
                <div key={item.id} className="mb-4">
                  <h4 className="font-semibold">{item.title}</h4>

                  {item.type === "video" || item.type === "quiz" ? (
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="mt-2 rounded bg-indigo-600 px-4 py-2 text-white"
                    >
                      {item.type === "video"
                        ? "Ver video"
                        : "Resolver cuestionario"}
                    </button>
                  ) : item.type === "pdf" ? (
                    <a
                      href={item.resourceUrl}
                      download
                      className="text-blue-600 underline"
                    >
                      Descargar PDF
                    </a>
                  ) : null}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{modalContent?.title}</DialogTitle>
          </DialogHeader>
          {modalContent?.type === "video" && (
            <iframe
              src={modalContent.url}
              className="aspect-video w-full rounded"
              allow="fullscreen"
            />
          )}
          {modalContent?.type === "quiz" && (
            <div>
              
              <p>Contenido del cuestionario (en construcción, posible form?)</p>
              
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
