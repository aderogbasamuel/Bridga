// hooks/useProducts.ts
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading };
};
