import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import { CartContext } from "../context/CartContext"; // ⭐ ADD THIS

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const [loading, setLoading] = useState(false);

  const { clearCart } = useContext(CartContext); // ⭐ ADD THIS

  // Shipping fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Error messages
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
  });

  if (cart.length === 0)
    return (
      <div className="text-center mt-5 fs-4 text-light">
        No items in cart for checkout.
      </div>
    );

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const validateField = (field, value) => {
    let message = "";
    if (field === "name") {
      if (!value.trim()) message = "Name is required.";
      else if (value.length < 2) message = "Name must be at least 2 characters.";
    } else if (field === "phone") {
      if (!value.trim()) message = "Phone number is required.";
      else if (!/^\d{10}$/.test(value))
        message = "Phone must be a valid 10-digit number.";
    } else if (field === "address") {
      if (!value.trim()) message = "Address is required.";
      else if (value.length < 5)
        message = "Address must be at least 5 characters.";
    }
    setErrors((prev) => ({ ...prev, [field]: message }));
    return message === "";
  };

  const validateAll = () => {
    const validName = validateField("name", name);
    const validPhone = validateField("phone", phone);
    const validAddress = validateField("address", address);
    return validName && validPhone && validAddress;
  };

  // ⭐⭐⭐ IMPORTANT: Clear cart after order success
  const placeOrder = async () => {
    if (!validateAll()) return;

    setLoading(true);
    try {
      const orderData = {
        cartItems: cart,
        totalAmount,
        shippingAddress: { name, phone, address },
      };

      const res = await axios.post("/orders", orderData);

      if (res.data.success) {

        clearCart();                 // ⭐ Clear cart (state)
        localStorage.removeItem("cart");  // ⭐ Clear localStorage

        navigate("/order-success", { state: { orderData: res.data.order } });
      } else {
        alert("Failed to place order. " + (res.data.error || ""));
      }
    } catch (err) {
      console.error("Error:", err.response || err);
      alert("Something went wrong. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-light hhh">Checkout</h2>

      <div className="row g-4 checkout-row">
        {/* Left */}
        <div className="col-lg-6 d-flex">
          <div className="card p-4 shadow-sm glass-card w-100 h-100">
            <h5 className="mb-3">Shipping Details</h5>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateField("name", name)}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                placeholder="10-digit Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => validateField("phone", phone)}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                placeholder="Shipping Address"
                rows="4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => validateField("address", address)}
              ></textarea>
              {errors.address && <div className="invalid-feedback">{errors.address}</div>}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-lg-6 d-flex">
          <div className="card p-4 shadow-sm glass-card w-100 h-100">
            <h5 className="mb-3">Order Summary</h5>

            <div className="overflow-auto" style={{ maxHeight: "400px" }}>
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="d-flex align-items-center mb-3 border-bottom pb-2"
                >
                  <img
                    src={item.product.images?.[0]?.image || "/images/placeholder.png"}
                    alt={item.product.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                      marginRight: "15px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.product.name}</h6>
                    <small className="text-muted">
                      ${item.product.price.toFixed(2)} x {item.qty}
                    </small>
                  </div>
                  <div className="fw-bold">
                    ${(item.product.price * item.qty).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 border-top pt-3">
              <h5>Total</h5>
              <h5>${totalAmount.toFixed(2)}</h5>
            </div>

            <button
              className="btn btn-success btn-lg w-100 mt-4"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
