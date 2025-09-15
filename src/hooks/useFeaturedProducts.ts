// src/hooks/useFeaturedProducts.ts
import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "@/services/firebase"

export function useFeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "products"), where("isFeatured", "==", true))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProducts(items)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { products, loading }
}
