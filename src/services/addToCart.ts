import { db } from "@/services/firebase"
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore"

export const addToCart = async (userId: string, product: any) => {
  if (!userId) throw new Error("User not logged in")

  const cartRef = collection(db, "users", userId, "cart")

  // Check if product already exists
  const q = query(cartRef, where("productId", "==", product.id))
  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    // Product already in cart → increment quantity
    const cartDoc = snapshot.docs[0]
    const itemRef = doc(db, "users", userId, "cart", cartDoc.id)
    const currentQty = cartDoc.data().quantity || 1

    await updateDoc(itemRef, {
      quantity: currentQty + 1,
    })
  } else {
    // Product not in cart → add new
    await addDoc(cartRef, {
      productId: product.id,
      name: product.name,
      priceAtAdd: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
      addedAt: serverTimestamp(),
    })
  }
}
