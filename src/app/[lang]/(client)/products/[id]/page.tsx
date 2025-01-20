import { getProducts } from "@/_actions/actions";
import { SelectProduct } from "@/db/schema";
import { ProductDesc } from "@/components/product-desc";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MoreProducts } from "@/components/more-products";

const ProductId = async (id: number) => {
  const products: SelectProduct[] = await getProducts();
  return products.find((product) => product.id === id);
};

interface EventDescProps {
  params: Promise<{ id: string; lang: string }>;
}

export default async function ProductDescription({ params }: EventDescProps) {
  const { id } = await params;
  const idProduct = await Number(id);
  const product = await ProductId(idProduct);
  const { lang } = await params;
  const session = await auth();
  const email = session?.user?.email;
    if (!email) redirect(`/${lang}/sign-in?redirect=store`);
    
    if (!product) {
    return <h1>Producto no encontrado</h1>;
  }
  return (
    <>
    <ProductDesc {...product}/>
    
    <div>
    <h1 className="mb-6 flex text-3xl justify-center font-extrabold uppercase tracking-tight lg:mb-8 lg:text-3xl xl:text-4xl">
          MAS PRODUCTOS
    </h1>
        <MoreProducts currentProductId={id}/>
    </div>
    </>
  );
}
