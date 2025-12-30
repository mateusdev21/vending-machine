import { useAppSelector } from "../../hooks";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const products = useAppSelector((s) => s.product.items);

  return (
    <div className="grid grid-cols-4 gap-4 p-4 overflow-y-auto max-h-screen">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
