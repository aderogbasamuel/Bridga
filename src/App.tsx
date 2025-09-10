import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/home/home.js";
import AppLayout from "./components/AppLayout.js";
import Shop from "./pages/shop/shop.tsx";
import CheckoutPage from "./pages/payments/Checkout.tsx";
import Wishlist from "./pages/wishlist/Wishlist.tsx";
import ContactPage from "./pages/contact/Contact.tsx";
import AdminDashboard from "./pages/Admin/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoutes.tsx";
import Login from "./pages/login.tsx";
import Signup from "./pages/signup.tsx";

// Admin pages
import AddProduct from "./pages/Admin/AddProducts.tsx";
import ProductList from "./pages/Admin/ProductLIst.tsx";
import Orders from "./pages/Admin/orders.tsx";
import ProductDetail from "./components/ProductDetails.tsx";
export default function App() {
  return (
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
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* 🔹 Public + User Routes */}
        <Route element={<AppLayout />}>
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/" element={<HomePage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<Shop />} />
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
  );
}
