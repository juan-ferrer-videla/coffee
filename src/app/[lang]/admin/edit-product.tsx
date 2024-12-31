import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editProduct } from "@/actions";
import { Textarea } from "@/components/ui/textarea";
import { SelectProduct } from "@/db/schema";

export const EditProduct = ({
  description,
  id,
  img,
  price,
  title,
}: SelectProduct) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"secondary"}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form action={editProduct} className="grid max-w-sm gap-6">
          <div className="w-fullitems-center grid gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Cogollo"
              defaultValue={title}
              required
            />
          </div>
          <div className="w-fullitems-center grid gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Este producto es utilizado para..."
              rows={4}
              defaultValue={description ?? ""}
            />
          </div>
          <div className="w-fullitems-center grid gap-1.5">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="5000"
              defaultValue={price}
              required
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" name="img" accept="image/*" />
          </div>
          <input type="hidden" name="publicId" value={img} required />
          <input type="hidden" name="id" value={id} required />
          <Button className="justify-self-end">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
