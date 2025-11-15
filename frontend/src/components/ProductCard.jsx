import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  return (
    <div 
      className="card shadow-sm border-0 rounded-4 h-100 product-card"
      style={{ cursor: "pointer" }}
    >
      {/* Image Section */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "220px",
          backgroundColor: "#f1f3f5",
          overflow: "hidden",
        }}
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          src={product.image || product.images?.[0]?.image}
          alt={product.name}
          style={{
            maxHeight: "90%",
            maxWidth: "90%",
            objectFit: "contain",
            transition: "0.3s",
          }}
          className="product-img"
        />
      </div>

      {/* Product Info */}
      <div className="card-body text-center">
        <h6 className="fw-bold">{product.name}</h6>
        <p className="text-muted small mb-2">
          {product.description?.substring(0, 50)}...
        </p>
        <h5 className="text-success fw-bold">${product.price}</h5>

        <div className="mt-3 d-flex gap-2 justify-content-center">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product._id}`);
            }}
          >
            View
          </button>

          <button
            className="btn btn-dark btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Add 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
