import { useEffect } from "react";
import BaseModal from "../common/BaseModal";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal } from "../../features/modalSlice";
import { getTransactions } from "../../features/transactionSlice";
import { formatCurrency } from "../../utils/formatCurrency";

export default function TransactionHistoryModal() {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector(s => s.transaction);

    useEffect(() => {
        dispatch(getTransactions());
    }, [dispatch]);

    return (
        <BaseModal>
            <h2 className="text-xl font-bold mb-4">
                Riwayat Transaksi
            </h2>

            {loading && <p>Loading...</p>}

            <div className="space-y-3 max-h-[60vh] overflow-auto">
                {items.length === 0 && (
                    <p className="text-gray-500">
                        Belum ada transaksi
                    </p>
                )}

                {items.map((t, idx) => (
                    <div
                        key={idx}
                        className="border rounded-lg p-3 text-sm"
                    >
                        <p className="font-semibold">
                            {new Date(t.createdAt).toLocaleString("id-ID")}
                        </p>

                        <ul className="ml-4 list-disc">
                            {t.items.map(i => (
                                <li key={i.id}>
                                    {i.name} x{i.qty}
                                </li>
                            ))}
                        </ul>

                        <p className="mt-2">
                            Total: <b>{formatCurrency(t.total)}</b>
                        </p>
                    </div>
                ))}
            </div>

            <button
                className="w-full mt-4 text-gray-600"
                onClick={() => dispatch(closeModal())}
            >
                Tutup
            </button>
        </BaseModal>
    );
}
