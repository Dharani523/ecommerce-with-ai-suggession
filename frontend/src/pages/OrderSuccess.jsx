import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { useNavigate, useLocation } from "react-router-dom";
import  "../styles/ordersuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.orderData || {};

  useEffect(() => {
    // 🎊 Trigger confetti animation
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="order-success-page">
      <div className="order-success-content glass-card">
        <h2 className="text-glow">🎉 Order Placed Successfully!</h2>
        <p className="text-glow">Thank you for your purchase.</p>

        <div className="mt-3 text-start order-summary">
          <h5 className="text-glow">Order Summary:</h5>
         <ul className="list-unstyled order-success-summary">

            <li>
              <strong>Name:</strong> {order.shippingAddress?.name || "N/A"}
            </li>
            <li>
              <strong>Phone:</strong> {order.shippingAddress?.phone || "N/A"}
            </li>
            <li>
              <strong>Address:</strong> {order.shippingAddress?.address || "N/A"}
            </li>
            <li>
              <strong>Total:</strong> ${order.totalAmount?.toFixed(2) || "0.00"}
            </li>
          </ul>
        </div>

        <button className="btn btn-glass mt-4" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
