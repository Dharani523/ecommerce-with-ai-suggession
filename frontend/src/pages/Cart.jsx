import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import AIAssistant from "../components/AIAssistant";

function Cart() {
  const { cart, removeFromCart, updateQty, totalAmount } =
    useContext(CartContext);

  const navigate = useNavigate();

  if (cart.length === 0)
    return <div className="text-center mt-5 fs-4">🛒 Your cart is empty.</div>;

  return (
    <>
      <AIAssistant context={cart} />

      <div className="container glass-card p-4 mt-5">
        <h2 className="text-center text-glow mb-4">Your Shopping Cart</h2>

        <div className="row g-4">
          {cart.map((item) => (
            <div key={item.product._id} className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <img
                  src={
                    item.product.images?.[0]?.image ||
                    "/images/placeholder.png"
                  }
                  className="card-img-top"
                  alt={item.product.name}
                  style={{
                    maxHeight: "200px",
                    objectFit: "contain",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/product/${item.product._id}`)}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.product.name}</h5>
                  <p className="text-muted mb-2">
                    ${item.product.price.toFixed(2)}
                  </p>

                  <div className="d-flex align-items-center mb-3">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() =>
                        updateQty(
                          item.product._id,
                          item.qty > 1 ? item.qty - 1 : 1
                        )
                      }
                    >
                      -
                    </button>

                    <span className="px-2">{item.qty}</span>

                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() =>
                        updateQty(item.product._id, item.qty + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="fw-bold">
                    Subtotal: ${(item.product.price * item.qty).toFixed(2)}
                  </p>

                  <button
                    className="btn btn-danger mt-auto"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-5 p-3 shadow rounded-4 bg-light">
          <h4>Total: ${totalAmount.toFixed(2)}</h4>
          <button
            className="btn btn-success btn-lg"
            onClick={() => navigate("/checkout", { state: { cart } })}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
