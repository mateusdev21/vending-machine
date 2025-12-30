import type { Product } from "../../types/product";
import { useAppDispatch } from "../../hooks";
import { openModal } from "../../features/modalSlice";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductCard({ product }: { product: Product }) {
    const dispatch = useAppDispatch();

    return (
        <div
            className="border-2 p-4 rounded-lg hover:cursor-pointer bg-white hover:border-yellow-500"
            onClick={() =>
                dispatch(openModal({ type: "PRODUCT", props: { product } }))
            }
        >
            <img src={product.image} className="h-32 mx-auto" />
            <h3 className="mt-8 text-center text-slate-800 font-medium">{product.name}</h3>
            <p className="text-gray-600 text-center">{formatCurrency(product.price)}</p>
        </div>
    );
}
