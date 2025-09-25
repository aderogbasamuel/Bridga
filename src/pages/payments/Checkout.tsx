import PaymentPageLayout from "../../components/PaymentPageLayout"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState, useEffect, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "@/services/firebase"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useCart } from "@/hooks/useCart"

interface FormData {
  name: string
  email: string
  phone: string
  address: string
}

function CheckoutPage() {
  const { cart, total, removeFromCart, updateQuantity } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Load Paystack script
  // useEffect(() => {
  //   const script = document.createElement("script")
  //   script.src = "https://js.paystack.co/v1/inline.js"
  //   document.body.appendChild(script)
  // }, [])
// Success callback
const handlePayment = () => {
  const Paystack = (window as any).PaystackPop;

  if (!Paystack || typeof Paystack.setup !== "function") {
    console.error("Paystack not loaded properly", Paystack);
    alert("Payment system not ready. Please refresh and try again.");
    return;
  }

  const handler = Paystack.setup({
  key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  email: form.email,
  amount: total * 100,
  currency: "NGN",

  // make sure callback is a plain function, not async arrow
  callback: function (response: any) {
    // console.log("Payment success:", response);

    addDoc(collection(db, "orders"), {
      userInfo: form,
      cart,
      total,
      transactionRef: response.reference,
      status: "paid",
      createdAt: serverTimestamp(),
    })
      .then(() => navigate("/order-success"))
      .catch((err) => console.error("Error saving order:", err));
  },

  onClose: function () {
    // console.log("Payment closed by user");
  },
});


  handler.openIframe();
};



  return (
    <PaymentPageLayout title="Checkout">
      <div className="p-6 md:p-18 grid grid-cols-1 sm:grid-cols-3 gap-1 w-full">
        {/* FORM */}
        <div className="w-full sm:col-span-2">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handlePayment()
            }}
          >
            <h3 className="text-[17px] text-[#333] font-bold">
              Contact Information
            </h3>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full border border-[#333] p-2 rounded-[5px] mt-4 text-[14px]"
              required
            />

            <h3 className="text-[17px] text-[#333] font-bold mt-12">
              Shipping address
            </h3>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border border-[#333] p-2 rounded-[5px] mt-4 text-[14px] w-full"
              required
            />

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="border border-[#333] p-2 rounded-[5px] mt-4 text-[14px] w-full"
              required
            />

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border border-[#333] p-2 rounded-[5px] mt-4 text-[14px] w-full"
            />

            <p className="text-[14px] text-[#333] my-12">
              By proceeding with your purchase you agree to our Terms and
              Conditions and Privacy Policy
            </p>

            <div className="grid grid-cols-2 items-center mt-3 gap-3">
              <Link to="/cartPage" className="flex items-center gap-3">
                <Icon
                  icon="garden:arrow-left-stroke-16"
                  width="16"
                  height="16"
                />
                Return to cart
              </Link>
              <button
                type="submit"
                className="bg-black p-4 text-white uppercase font-bold text-[14px] w-full"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="border p-4 w-full">
          <p className="font-bold mb-3">Order Summary</p>
          <ul className="space-y-4">
            {cart.map((item) => (
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
                    <p className="capitalize text-[14px]">{item.name}</p>
                    <p className="text-[14px]">
                      ₦{Number(item.price).toLocaleString()}
                    </p>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id!, item.quantity - 1)
                        }
                        className="border px-2 rounded-md"
                      >
                        −
                      </button>
                      <p className="border px-2 rounded-md">{item.quantity}</p>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id!, item.quantity + 1)
                        }
                        className="border px-2 rounded-md"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id!)}
                      className="underline text-[12px] my-2"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
                <p>
                  ₦{Number(item.quantity * item.price).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 font-bold text-right">
            Total: ₦{total.toLocaleString()}
          </div>
        </div>
      </div>
    </PaymentPageLayout>
  )
}

export default CheckoutPage
