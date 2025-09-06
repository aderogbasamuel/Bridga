// services/productService.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import type { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[];
};
