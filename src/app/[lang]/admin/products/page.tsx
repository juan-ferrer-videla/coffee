import { getProducts } from "@/_actions/actions";
import { CreateProduct } from "@/components/create-product";
import { Product } from "./product";
import { Suspense } from "react";
import { GridSkeleton } from "@/components/grid-skeleton";

const Products = async () => {
  const products = await getProducts();

  return (
    <ul className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16">
      {products.map((product) => (
        <li key={product.title} className="w-full">
          <Product {...product} />
        </li>
      ))}
    </ul>
  );
};

export default function ProductsPage() {
  return (
    <>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight lg:text-5xl xl:text-6xl">
          Administrador
        </h1>
        <p className="mb-8 max-w-2xl scroll-m-20 text-lg font-light text-muted-foreground sm:mb-12 md:mb-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam facere
        </p>
      </div>
      <CreateProduct />
      <Suspense fallback={<GridSkeleton />}>
        <Products />
      </Suspense>
    </>
  );
}
