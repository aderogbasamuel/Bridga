import { Icon } from "@iconify/react"
import QuantityCounter from "../utils/QuantityCounter"
import { useEffect, useState } from "react"
import { db } from "@/services/firebase"
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore"
import { useAuth } from "@/context/AuthContext"
import { Link } from "react-router-dom"

interface CartItem {
  id: string
  productId: string
  name: string
  priceAtAdd: number
  imageUrl: string
  quantity: number
}

function CartBar({
  cartBar,
  setCartBar,
}: {
  cartBar: boolean
  setCartBar: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  // Listen to cart items in realtime
  useEffect(() => {
    if (!user) return

    const cartRef = collection(db, "users", user.uid, "cart")

    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CartItem[]
      setCartItems(items)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user])

  // Update quantity
  const updateQuantity = async (id: string, newQty: number) => {
    if (!user || newQty < 1) return
    const itemRef = doc(db, "users", user.uid, "cart", id)
    await updateDoc(itemRef, { quantity: newQty })
  }

  // Remove from cart
  const removeItem = async (id: string) => {
    if (!user) return
    const itemRef = doc(db, "users", user.uid, "cart", id)
    await deleteDoc(itemRef)
  }

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0
  )

  if (loading) return <p>Loading cart...</p>

  return (
    <div className="relative">
      {cartBar && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setCartBar(false)} // closes on click
        ></div>
      )}

      <div
        className={`fixed transform transition-transform duration-300 z-50 w-[320px] bg-white flex flex-col top-0 right-0 h-full shadow-lg ${
          cartBar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-[#223353] text-center py-3 px-2">
          <h2 className="uppercase text-white font-bold text-[18px] flex items-center justify-center relative">
            <button onClick={() => setCartBar(false)}>
              <Icon
                icon="tabler:chevron-left"
                width="24"
                height="24"
                className="absolute left-0"
              />
            </button>
            My Cart
          </h2>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b pb-3 items-center"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    ₦{item.priceAtAdd.toLocaleString()}
                  </p>
                  <QuantityCounter
                    value={item.quantity}
                    onChange={(newQty) => updateQuantity(item.id, newQty)}
                    min={1}
                  />
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500"
                >
                  <Icon icon="tabler:trash" width="20" height="20" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="flex flex-col justify-end p-4 border-t gap-3">
            <p className="text-[16px] font-bold text-[#555] flex uppercase justify-between">
              Subtotal:{" "}
              <span>₦{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </p>
            <Link to="/cartPage" className="uppercase bg-[#223353] text-white text-[15px] py-3 w-full font-bold text-center" onClick={() => setCartBar(false)}>
              View Cart
            </Link>
            <button className="uppercase bg-[#223353] text-white text-[15px] py-3 w-full font-bold">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartBar
