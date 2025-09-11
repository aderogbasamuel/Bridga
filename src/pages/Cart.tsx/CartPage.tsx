import PaymentPageLayout from "@/components/PaymentPageLayout";
import { useEffect, useState } from "react";
import { db } from "@/services/firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext"; // make sure you have user context

interface CartItem {
  id: string;
  productId: string;
  name: string;
  priceAtAdd: number;
  imageUrl: string;
  quantity: number;
}

const CartPage = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen to cart items in realtime
  useEffect(() => {
    if (!user) return;

    const cartRef = collection(db, "users", user.uid, "cart");

    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CartItem[];
      setCartItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Update quantity
  const updateQuantity = async (id: string, newQty: number) => {
    if (!user || newQty < 1) return;
    const itemRef = doc(db, "users", user.uid, "cart", id);
    await updateDoc(itemRef, { quantity: newQty });
  };

  // Remove from cart
  const removeItem = async (id: string) => {
    if (!user) return;
    const itemRef = doc(db, "users", user.uid, "cart", id);
    await deleteDoc(itemRef);
  };

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0
  );

  // Right now just log so you can see data before UI
  if (loading) return <p>Loading cart...</p>;

  return (
    <PaymentPageLayout title="Shopping Cart">
      <div className="grid-cols-1 sm:grid-cols-2 px-6 md:px-24">
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="flex gap-2">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20"/>
              <div>
                {/* -  × {item.quantity} */}
                <p>{item.name}</p>
                <p>₦{item.priceAtAdd}</p>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <p>Total: ₦{total.toLocaleString()}</p>
      </div>
    </PaymentPageLayout>
  );
};

export default CartPage;
