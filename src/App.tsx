import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home/home.js";
import AppLayout from "./components/AppLayout.js";
import Shop from "./pages/shop/shop.tsx";
import CheckoutPage from "./pages/payments/Checkout.tsx";
import Wishlist from "./pages/wishlist/Wishlist.tsx";
import ContactPage from "./pages/contact/Contact.tsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx";
import Login from "./pages/login.tsx";
import Signup from "./pages/signup.tsx";
import CartPage from "./pages/Cart.tsx/CartPage.tsx";
// Admin pages
import AddProduct from "./pages/Admin/AddProducts.tsx";
import ProductList from "./pages/Admin/ProductLIst.tsx";
import OrdersPage from "./pages/Admin/orders.tsx";
import ProductDetail from "./components/ProductDetails.tsx";
import AdminLayout from "./pages/Admin/AdminLayout.tsx";
import { Toaster } from "react-hot-toast";
import EditProduct from "./pages/Admin/EditProduct.tsx";
import PrivacyPolicyPage from "./pages/home/PrivacyPolicy.tsx";
export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* 🔹 Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard/>}/>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="/admin/edit/:id" element={<EditProduct />} />

        </Route>

        {/* 🔹 Public + User Routes */}
        <Route element={<AppLayout />}>
          <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<Shop />} />
            <Route path="cartpage" element={<CartPage/>}/>
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
      </BrowserRouter>
 <Toaster
        position="top-right"
        toastOptions={{
          // default options
          duration: 4000,
          style: {
            borderRadius: "8px",
            padding: "12px 16px",
            fontWeight: 500,
          },
          success: {
            style: { background: "#16a34a", color: "#fff" },
          },
          error: {
            style: { background: "#dc2626", color: "#fff" },
          },
        }}
      />
    </>
  );
}
