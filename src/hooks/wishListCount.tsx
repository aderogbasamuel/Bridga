import { useEffect, useState } from "react"
import { db } from "../services/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"

export function useWishlistCount() {
  const { user } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!user) {
      setCount(0)
      return
    }

    const wishlistRef = collection(db, "wishlists", user.uid, "items")

    // Realtime listener
    const unsubscribe = onSnapshot(wishlistRef, (snapshot) => {
      setCount(snapshot.size)
    })

    return () => unsubscribe()
  }, [user])

  return count
}
