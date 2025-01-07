import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { createProduct } from "@/_actions/actions";
import { Checkbox } from "./ui/checkbox";
import { Submit } from "./submit";

export const CreateProduct = async () => {
  return (
    <section className="pb-10 sm:pb-12 md:pb-16 lg:pb-20">
      <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Añadir Producto
      </h2>
      <form action={createProduct} className="align-start grid gap-6">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Cogollo" required />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            placeholder="5000"
            required
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input
            id="picture"
            type="file"
            name="img"
            accept="image/*"
            required
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Este producto es utilizado para..."
            rows={4}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="is_recommended" defaultChecked name="isRecommended" />
          <label
            htmlFor="is_recommended"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Es recomendado
          </label>
        </div>
        <div>
          <Submit />
        </div>
      </form>
    </section>
  );
};
