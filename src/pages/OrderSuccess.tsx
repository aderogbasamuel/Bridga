import { Link } from "react-router-dom"
import { CheckCircle } from "lucide-react"

function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Success Icon */}
      <CheckCircle className="text-green-500 w-20 h-20 mb-6" />

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Order Successful 🎉
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Thank you for shopping with <span className="font-semibold">Bridga</span>.  
        Your order has been placed successfully. We’ll send you updates by email.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <Link
          to="/"
          className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="px-6 py-3 border border-gray-400 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
        >
          View Orders
        </Link>
      </div>
    </div>
  )
}

export default OrderSuccess
