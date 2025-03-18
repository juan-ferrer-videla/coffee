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

type CourseContentProps = {
  modules: {
    id: number;
    title: string;
    videos: {
      id: number;
      title: string;
      url: string;
    }[];
    files: {
      id: number;
      title: string;
      url: string;
    }[];
    questions: {
      id: number;
      remoteModuleId: number;
      question: string;
      answer: string;
      items: { id: number; choice: string; moduleQuestionId: number }[];
    }[];
  }[];
};

export const CourseContent: React.FC<CourseContentProps> = ({ modules }) => {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    type: string;
    url?: string;
    answer?: string;
    items?: { id: number | string; choice: string }[];
  } | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] =>
    [...array].sort(() => Math.random() - 0.5);

  const handleOpenModal = (item: {
    title: string;
    type: string;
    resourceUrl?: string;
    answer?: string;
    items?: {
      id: number | string;
      choice: string;
      moduleQuestionId?: number;
    }[];
  }) => {
    if (item.type === "quiz") {
      const shuffledItems = shuffleArray(item.items ?? []);
      setModalContent({
        ...item,
        items: shuffledItems,
      });
    } else {
      setModalContent({
        title: item.title,
        type: item.type,
        url: item.resourceUrl ?? "",
      });
    }
    setOpen(true);
  };

  const handleSelectChoice = (choice: string) => {
    setSelectedChoice(choice);
    setIsCorrect(choice === modalContent?.answer);
  };

  const handleRetry = () => {
    setSelectedChoice(null);
    setIsCorrect(null);
  };

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {modules.map((mod) => {
          const items = [
            ...mod.videos.map((v) => ({
              id: v.id,
              title: v.title,
              type: "video" as const,
              resourceUrl: v.url,
            })),
            ...mod.files.map((f) => ({
              id: f.id,
              title: f.title,
              type: "pdf" as const,
              resourceUrl: f.url,
            })),
            ...mod.questions.map((q) => ({
              id: q.id,
              title: q.question,
              type: "quiz" as const,
              answer: q.answer,
              items: [
                ...q.items.map((a) => ({
                  id: a.id,
                  choice: a.choice,
                })),
                {
                  id: `correct-${q.id}`,
                  choice: q.answer,
                },
              ],
            })),
          ];

          return (
            <AccordionItem key={mod.id} value={`module-${mod.id}`}>
              <AccordionTrigger>{mod.title}</AccordionTrigger>
              <AccordionContent>
                {items.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="mb-4">
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
          );
        })}
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
          <div className="space-y-2">
            {modalContent?.items?.map((item) => {
              const isSelected = item.choice === selectedChoice;

              let bgColor = "hover:bg-gray-600";
              if (selectedChoice) {
                if (isSelected && isCorrect) bgColor = "bg-green-500";
                else if (isSelected && !isCorrect)
                  bgColor = "bg-red-500 text-white";
                else bgColor = "bg-gray-500";
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectChoice(item.choice)}
                  className={`block w-full rounded px-4 py-2 text-left ${bgColor}`}
                  disabled={!!selectedChoice}
                >
                  {item.choice}
                </button>
              );
            })}
          </div>

          {selectedChoice && (
            <div className="mt-4">
              <p className="font-semibold">
                {isCorrect
                  ? "¡Correcto!"
                  : "Respuesta incorrecta. Intentalo de nuevo."}
              </p>
              {!isCorrect && (
                <button
                  onClick={handleRetry}
                  className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Volver a intentar
                </button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
