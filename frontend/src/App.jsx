import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Checkout from "./pages/Checkout"; // ✅ Import Checkout page
import axios from "./axiosInstance";
import OrderSuccess from "./pages/OrderSuccess";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import AIAssistant from "./components/AIAssistant";

// import styles from "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const { cart } = useContext(CartContext);


  useEffect(() => {
    // Optional: fetch categories if route exists
    // axios
    //   .get("/products/categories")
    //   .then((res) => setCategories(res.data.categories || []))
    //   .catch((err) => console.log("Failed to load categories", err));
  }, []);

 return (
  <Router>
    <Navbar categories={categories} />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
    </Routes>

    {/* ✅ AI must be OUTSIDE ROUTES, always visible */}
    <AIAssistant cart={cart} />
  </Router>
);

}

export default App;
