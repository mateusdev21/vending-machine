import api from "./api";
import type { Transaction } from "../types/transaction";

export const createTransaction = (data: Transaction) =>
    api.post("/transactions", data);

export const fetchTransactions = () =>
    api.get<Transaction[]>("/transactions?_sort=createdAt&_order=desc");
