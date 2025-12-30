import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchProducts } from "./features/productSlice";

import ProductGrid from "./components/product/ProductGrid";
import ProductDetailModal from "./components/product/ProductDetailModal";
import CartPanel from "./components/cart/CartPanel";
import CashPaymentModal from "./components/payment/PaymentModal";
import NotificationToast from "./components/common/NotificationToast";
import TransactionHistoryModal from "./components/transaction/TransactionHistoryModal";

export default function App() {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(state => state.modal.type);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-[2fr_1fr]">
      <NotificationToast />
      {/* LEFT: PRODUCT */}
      <div className="overflow-hidden mt-0 pt-0">
        <ProductGrid />
      </div>

      {/* RIGHT: CART */}
      <div className="p-4 min-w-full">
        <CartPanel />
      </div>

      {/* MODALS */}
      {modal === "PRODUCT" && <ProductDetailModal />}
      {modal === "PAYMENT" && <CashPaymentModal />}
      {modal === "TRANSACTION_HISTORY" && (
        <TransactionHistoryModal />
      )}
    </div>
  );
}
