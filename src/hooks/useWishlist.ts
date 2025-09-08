// hooks/useWishlist.ts
import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { 
  collection, doc, setDoc, deleteDoc, getDocs 
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) loadWishlist(u.uid);
      else setWishlist([]);
    });
    return () => unsub();
  }, []);

  const loadWishlist = async (uid: string) => {
    const snap = await getDocs(collection(db, "users", uid, "wishlist"));
    setWishlist(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const toggleWishlist = async (uid: string, product: any) => {
    const ref = doc(db, "users", uid, "wishlist", product.id);

    // check if already exists
    const exists = wishlist.find((item) => item.id === product.id);

    if (exists) {
      await deleteDoc(ref);
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      await setDoc(ref, product);
      setWishlist((prev) => [...prev, product]);
    }
  };

  return { wishlist, user, toggleWishlist };
};
