import BaseModal from "../common/BaseModal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    insertMoney,
    resetPayment,
    startDispensing
} from "../../features/paymentSlice";
import { formatCurrency } from "../../utils/formatCurrency";
import { clearCart } from "../../features/cartSlice";
import { closeModal } from "../../features/modalSlice";
import { postTransaction } from "../../features/transactionSlice";
import { showNotification } from "../../features/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";

const DENOMINATIONS = [2000, 5000, 10000, 20000, 50000];

export default function CashPaymentModal() {
    const dispatch = useAppDispatch();
    const { total, paid, change, status } = useAppSelector(
        s => s.payment
    );

    const cartItems = useAppSelector(s => s.cart.items);

    return (
        <BaseModal>
            <h2 className="text-xl font-bold mb-2">Pembayaran Tunai</h2>

            <div className="space-y-1 mb-4">
                <p>Total: <b>{formatCurrency(total)}</b></p>
                <p>Uang Masuk: <b>{formatCurrency(paid)}</b></p>

                {status === "SUCCESS" && (
                    <p className="text-green-600">
                        Kembalian: {formatCurrency(change)}
                    </p>
                )}
            </div>

            {/* BUTTON PECAHAN */}
            {status === "INSERTING" && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {DENOMINATIONS.map(d => (
                        <button
                            key={d}
                            className="bg-gray-200 py-2 rounded-lg"
                            onClick={() => dispatch(insertMoney(d))}
                        >
                            {formatCurrency(d)}
                        </button>
                    ))}
                </div>
            )}

            {/* SUCCESS */}
            {status === "SUCCESS" && (
                <button
                    className="w-full bg-green-600 text-white py-2 rounded-lg"
                    onClick={() => {
                        dispatch(startDispensing());

                        dispatch(
                            postTransaction({
                                items: cartItems,
                                total,
                                paid,
                                change,
                                createdAt: new Date().toISOString()
                            })
                        );

                        dispatch(
                            showNotification({
                                id: nanoid(),
                                type: "success",
                                message: "Pembayaran berhasil! Terima kasih 🙏"
                            })
                        );

                        setTimeout(() => {
                            dispatch(clearCart());
                            dispatch(resetPayment());
                            dispatch(closeModal());
                        }, 2000);
                    }}
                >
                    Ambil Produk
                </button>
            )}

            <button
                className="w-full mt-2 text-gray-500"
                onClick={() => {
                    dispatch(resetPayment());
                    dispatch(closeModal());
                }}
            >
                Batal
            </button>
        </BaseModal>
    );
}
