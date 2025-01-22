import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { FrequentQuestions } from "./faq-courses";

export function FaqModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Info</Button>
      </DialogTrigger>
      <DialogContent className="max-h-dvh max-w-[420px] overflow-auto md:max-w-lg">
        <DialogHeader>
          <DialogTitle>Preguntas Frecuentes</DialogTitle>
          <DialogDescription asChild>
            <FrequentQuestions />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Entendido</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
