import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createEvent } from "@/_actions/actions";
import { Submit } from "@/components/submit";

export const CreateEvent = async () => {
  return (
    <section className="pb-10 sm:pb-12 md:pb-16 lg:pb-20">
      <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Añadir Evento
      </h2>
      <form action={createEvent} className="align-start grid gap-6">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Evento de ..." required />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="date">Fecha</Label>
          <Input
            id="date"
            name="date"
            placeholder="15 de Enero, 2025"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Imagen</Label>
          <Input id="image" type="file" name="img" accept="image/*" required />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Este producto es utilizado para..."
            rows={4}
            required
          />
        </div>

        <div>
          <Submit />
        </div>
      </form>
    </section>
  );
};
