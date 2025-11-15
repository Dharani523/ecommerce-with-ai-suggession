import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Load and validate cart from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return [];

    try {
      const parsed = JSON.parse(savedCart);
      return Array.isArray(parsed)
        ? parsed.filter(
            (item) =>
              item?.product && typeof item.product.price === "number"
          )
        : [];
    } catch (e) {
      console.error("Invalid cart data found, resetting.", e);
      return [];
    }
  });

  // Save updated cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    const exist = cart.find((item) => item.product._id === product._id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
      alert(`${product.name} quantity updated in cart!`);
    } else {
      setCart([...cart, { product, qty: 1 }]);
      alert(`${product.name} added to cart!`);
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.product._id !== id));
  };

  // Update quantity
  const updateQty = (id, qty) => {
    setCart(
      cart.map((item) =>
        item.product._id === id ? { ...item, qty } : item
      )
    );
  };

  // Clear entire cart + localStorage
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // ⭐ important fix
  };

  // Calculate total amount
  const totalAmount = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
