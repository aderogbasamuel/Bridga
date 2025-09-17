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
  const [shippingFees, setShippingFees] = useState(0);
  // Calculate shipping fee based on total

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
  const computedShippingFee =
    total > 0 && total < 5000 ? 1000 : total >= 5000 ? 0 : 0;

  // Right now just log so you can see data before UI
  if (loading) return <p>Loading cart...</p>;

  return (
    <PaymentPageLayout title="Shopping Cart">
      <div className="grid grid-cols-1 sm:grid-cols-3 px-6 md:px-24 gap-12">
        <ul className="col-span-2">
          <li className="flex gap-2 justify-between font-bold border-b pb-2 mb-2 text-[10px] text-[#333] uppercase">
            <p>Product</p>
            <p>Total</p>
          </li>
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex gap-2 justify-between text-[#333]"
            >
              <div className="flex gap-2">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20"
                />
                <div className="flex flex-col gap-1">
                  {/* -  × {item.quantity} */}
                  <p className="capitalize text-[14px]">{item.name}</p>
                  <p className="text-[14px]">
                    ₦{Number(item.priceAtAdd).toLocaleString()}
                  </p>
                  <div className="flex">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="border px-2 rounded-md"
                    >
                      −
                    </button>
                    <p className="border px-2 rounded-md">{item.quantity}</p>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="border px-2 rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="underline text-[12px] my-10"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
              <p>₦{Number(item.quantity * item.priceAtAdd).toLocaleString()}</p>
            </li>
          ))}
        </ul>
        <div>
          <p className="uppercase font-bold text-[#555] text-[10px] border-b-1 border-[#555] pb-2">
            Cart Totals
          </p>
          <div className="flex flex-col gap-2 mt-4 text-[#333] text-[14px] border-b-1 border-[#555] pb-4">
            <div className="flex justify-between">
              <p>Shipping Fees </p>{" "}
              <p>₦{computedShippingFee.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p>Subtotal:</p> ₦{total.toLocaleString()}
            </div>
          </div>
          <div className="flex justify-between py-4 text-[#333] font-bold text-[17px] border-b-1 border-[#555]">
            <span className="">Estimated Total</span>     ₦{(total+computedShippingFee).toLocaleString()}
          </div>
        </div>
      </div>
    </PaymentPageLayout>
  );
};

export default CartPage;
