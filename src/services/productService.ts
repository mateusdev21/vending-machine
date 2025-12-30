import api from "./api";
import type { Product } from "../types/product";

export const fetchProductsApi = () =>
    api.get<Product[]>("/products");
