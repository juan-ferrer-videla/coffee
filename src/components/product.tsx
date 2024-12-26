import type { TProduct } from "@/context/store";
import { Count, DecreaseButton, IncreaseButton } from "./product.client";

export const Product = ({ title, price, id }: TProduct) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{price}</p>
      <div className="flex items-center">
        <DecreaseButton id={id.toString()} />
        <Count id={id.toString()} />
        <IncreaseButton id={id.toString()} />
      </div>
    </div>
  );
};
