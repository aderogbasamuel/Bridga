// hooks/useCategories.ts
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export const useCategories = () => {
  const [categories, setCategories] = useState<{ id: string; name: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "categories"));
        const cats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as { id: string; name: string; value: string }[];
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};
