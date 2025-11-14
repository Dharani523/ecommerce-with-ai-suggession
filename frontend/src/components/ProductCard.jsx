import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card glass-card p-3 h-100">

      {/* Image Section */}
      <div
        style={{
          height: "250px",
          backgroundColor: "#f8f9fa",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          src={product.image || product.images?.[0]?.image}
          alt={product.name}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Product Info */}
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title text-center fw-bold text-dark">
          {product.name}
        </h5>
        <p className="text-center text-muted small">
          {product.description?.substring(0, 60)}...
        </p>
        <h6 className="text-center fw-bold text-success mb-3">
          ${product.price}
        </h6>

        {/* Buttons */}
        <div className="d-flex justify-content-around mt-auto">
          <button
            className="btn btn-outline-primary btn-sm px-3"
            onClick={() => navigate(`/product/${product._id}`)}
          >
            View Details
          </button>
          <button
            className="btn btn-dark btn-sm px-3"
            onClick={() => addToCart(product)}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
