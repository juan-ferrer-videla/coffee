import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { createProduct } from "@/actions";
import { Button } from "./ui/button";
export const CreateProduct = async () => {
  return (
    <div>
      <h2 className="mb-4 scroll-m-20 text-2xl font-semibold tracking-tight">
        Añadir Producto
      </h2>
      <form action={createProduct} className="">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Cogollo" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Este producto es utilizado para..."
            rows={4}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="price">Price</Label>
          <Input type="number" id="price" name="price" placeholder="5000" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="img">URL Image</Label>
          <Input id="img" name="img" placeholder="https://www.imgur.com/asd" />
        </div>
        <Button className="self-start">Submit</Button>
      </form>
    </div>
  );
};
