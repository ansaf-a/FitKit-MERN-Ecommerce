import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import CartToast from "./components/CartToast.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Critical landing pages loaded upfront
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";

// Code-split route chunks loaded on demand
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const MyOrders = lazy(() => import("./pages/MyOrders.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const About = lazy(() => import("./pages/About.jsx"));

const routerBasename =
  !import.meta.env.BASE_URL || import.meta.env.BASE_URL === "/"
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, "");

function DashboardRedirect() {
  const user = JSON.parse(localStorage.getItem("fitkit-user") || "null");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return user.role === "admin" ? (
    <Navigate to="/admin" replace />
  ) : (
    <Navigate to="/my-orders" replace />
  );
}

function PageLoader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "65vh",
        gap: "14px",
        color: "#1b3024",
      }}
    >
      <div
        style={{
          width: "38px",
          height: "38px",
          border: "3px solid #e2e8f0",
          borderTopColor: "#1b3024",
          borderRadius: "50%",
          animation: "fitkit-spin 0.7s linear infinite",
        }}
      />
      <span
        style={{
          fontSize: "13px",
          fontWeight: "600",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Loading FitKit...
      </span>
      <style>{`@keyframes fitkit-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <CartProvider>
        <CartToast />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
