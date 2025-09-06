// hooks/useProducts.ts
import { useEffect, useState } from "react";
import { getProducts } from "../services/ProductServices";
import type { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data: Product[]) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading };
};
