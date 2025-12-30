import { useAppDispatch, useAppSelector } from "../../hooks";
import { removeFromCart } from "../../features/cartSlice";
import { formatCurrency } from "../../utils/formatCurrency";
import { startCashPayment } from "../../features/paymentSlice";
import { openModal } from "../../features/modalSlice";
import { FaReceipt } from "react-icons/fa";

export default function CartPanel() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.cart.items);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    return (
        <div className="h-full min-w-full bg-[#242424] p-4 flex flex-col rounded-lg border-2 border-yellow-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Keranjang</h2>

                <button
                    className="text-gray-600 text-xl"
                    onClick={() =>
                        dispatch(openModal({ type: "TRANSACTION_HISTORY" }))
                    }
                >
                    <FaReceipt size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-auto space-y-2">
                {items.length === 0 && (
                    <p className="text-gray-500">Belum ada item</p>
                )}

                {items.map(item => (
                    <div
                        key={item.id}
                        className="bg-[#303030] p-3 rounded-lg flex justify-center items-center"
                    >
                        <div className="flex items-center flex-1 justify-start">
                            <div className="mr-4">
                                <img
                                    src={item.image}
                                    className="h-12 w-12 object-cover rounded-lg"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">
                                    {item.qty} x {formatCurrency(item.price)}
                                </p>
                            </div>
                        </div>

                        <button
                            className="text-red-600"
                            onClick={() => dispatch(removeFromCart(item.id))}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <div className="border-t pt-4 mt-4 border-yellow-500">
                <p className="font-bold mb-4">Total :  {formatCurrency(total)}</p>

                <button
                    disabled={items.length === 0}
                    className="w-full text-yellow-500 py-3 rounded-lg disabled:opacity-50"
                    onClick={() => {
                        dispatch(startCashPayment(total));
                        dispatch(openModal({ type: "PAYMENT" }));
                    }}
                >
                    Bayar
                </button>
            </div>
        </div>
    );
}
