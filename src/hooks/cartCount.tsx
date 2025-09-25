import { useEffect, useState } from "react"
import { db } from "../services/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"

export function useCartCount() {
  const { user } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!user) {
      setCount(0)
      return
    }

    const cartRef = collection(db, "users", user.uid, "cart")

    // Realtime listener
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      setCount(snapshot.size)
    })

    return () => unsubscribe()
  }, [user])

  return count
}