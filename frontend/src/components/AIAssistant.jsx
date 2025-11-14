import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import "../styles/AIAssistant.css";

function AIAssistant({ cart }) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    axios.get("/products")
      .then((res) => setProducts(res.data.products || []))
      .catch(() => console.log("Failed to fetch products"));
  }, []);

  // AI Reason Generator
  const getReason = (product, cart) => {
    const cartCategories = cart.map(c => c.product.category);

    if (cartCategories.includes(product.category)) {
      return `Because you bought items from "${product.category}" category.`;
    }

    if (product.price < 30) {
      return "Budget-friendly pick often bought together.";
    }

    if (product.name.toLowerCase().includes("pro")) {
      return "A premium alternative you may love.";
    }

    return "Recommended based on your shopping interest.";
  };

  // Build recommendations
  useEffect(() => {
    if (!cart || cart.length === 0) {
      setSuggestions([]);
      return;
    }

    const cartCategories = cart.map(item => item.product.category);

    // Filter suggestions
    let recommended = products.filter(
      p =>
        cartCategories.includes(p.category) &&
        !cart.some(c => c.product._id === p._id)
    );

    // fallback if fewer than 5
    const others = products.filter(
      p => !cart.some(c => c.product._id === p._id)
    );

    recommended = [...recommended, ...others].slice(0, 5);

    // Add reason to each item
    const final = recommended.map(item => ({
      ...item,
      reason: getReason(item, cart),
    }));

    setSuggestions(final);
  }, [cart, products]);

  return (
    <>
      {/* Floating Button */}
      <div className="ai-floating-btn" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {/* Popup */}
      {open && (
        <div className="ai-popup glass-card">
          <h5 className="fw-bold mb-2 text-dark">Smart Recommender</h5>

          {suggestions.length === 0 ? (
            <p className="text-muted small">No suggestions yet. Add items to your cart.</p>
          ) : (
            suggestions.map(item => (
              <div
                key={item._id}
                className="ai-item"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img
                  src={item.images?.[0]?.image || "/images/placeholder.png"}
                  alt={item.name}
                />

                <div>
                  <p className="name">{item.name}</p>
                  <p className="price">${item.price}</p>
                  <p className="reason">{item.reason}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default AIAssistant;
