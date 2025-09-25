import { useState, useEffect } from "react"
import { db } from "@/services/firebase"
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore"

import type { DocumentData } from "firebase/firestore"

import { useAuth } from "@/context/AuthContext" // assuming you have this

export interface CartItem {
  id?: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export const useCart = () => {
  const { user } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])

  // Fetch cart items
  useEffect(() => {
    if (!user) return
    const fetchCart = async () => {
      const snap = await getDocs(collection(db, "users", user.uid, "cart"))
      const items: CartItem[] = snap.docs.map((doc) => {
        const data = doc.data() as DocumentData
        return {
          id: doc.id,
          name: data.name,
          price: data.priceAtAdd,
          quantity: data.quantity,
          imageUrl: data.imageUrl,
        }
      })
      setCart(items)
    }
    fetchCart()
  }, [user])
// console.log(cart)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Add new product
  const addToCart = async (product: Omit<CartItem, "id" | "quantity">) => {
    if (!user) return
    await addDoc(collection(db, "users", user.uid, "cart"), {
      ...product,
      quantity: 1,
      addedAt: new Date(),
    })
  }

  // Update quantity
  const updateQuantity = async (id: string, qty: number) => {
    if (!user) return
    await updateDoc(doc(db, "users", user.uid, "cart", id), { quantity: qty })
  }

  // Remove product
  const removeFromCart = async (id: string) => {
    if (!user) return
    await deleteDoc(doc(db, "users", user.uid, "cart", id))
  }

  return { cart, total, addToCart, updateQuantity, removeFromCart }
}
