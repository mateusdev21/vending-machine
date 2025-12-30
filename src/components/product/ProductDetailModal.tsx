import { useAppDispatch, useAppSelector } from "../../hooks";
import { addToCart } from "../../features/cartSlice";
import { closeModal } from "../../features/modalSlice";
import BaseModal from "../common/BaseModal";
import { formatCurrency } from "../../utils/formatCurrency";
import { showNotification } from "../../features/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";

export default function ProductDetailModal() {
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => state.modal.props.product);

    const isOutOfStock = product.stock <= 0;

    return (
        <BaseModal>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="mb-2">{formatCurrency(product.price)}</p>
            {isOutOfStock && (
                <p className="text-red-600 text-sm mb-4">
                    Produk sedang habis
                </p>
            )}

            <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg mb-2"
                onClick={() => {
                    if (isOutOfStock) {
                        dispatch(
                            showNotification({
                                id: nanoid(),
                                type: "error",
                                message: "Maaf Stok Habis"
                            })
                        );
                        return;
                    }

                    dispatch(addToCart(product));
                    dispatch(closeModal());
                }}
            >
                Tambah ke Keranjang
            </button>

            <button
                className="w-full text-gray-600"
                onClick={() => dispatch(closeModal())}
            >
                Batal
            </button>
        </BaseModal>
    );
}
