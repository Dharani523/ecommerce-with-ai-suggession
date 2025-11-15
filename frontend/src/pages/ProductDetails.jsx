import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import { CartContext } from "../context/CartContext";
import AIAssistant from "../components/AIAssistant";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ⭐ NEW — quantity state
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setMainImage(
          res.data.product.images?.[0]?.image || "/images/placeholder.png"
        );
      })
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;
  if (!product) return <div className="text-center mt-5">Product not found</div>;

  return (
    <>
      <AIAssistant context={product} />

      <div className="container my-5">
        <div className="row g-4 align-items-center">

          {/* Product Images */}
          <div className="col-md-6 text-center">
            <div
              style={{
                height: "450px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                backgroundColor: "#f8f9fa",
              }}
            >
              <img
                src={mainImage}
                alt={product.name}
                className="img-fluid"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Thumbnails */}
            <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.image}
                  alt={`${product.name} ${index}`}
                  className="img-thumbnail"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => setMainImage(img.image)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <h2 className="fw-bold">{product.name}</h2>
            <p className="text-muted" style={{ fontSize: "1.1rem" }}>
              {product.description}
            </p>
            <h4 className="text-success fw-bold mb-3">
              ${product.price.toFixed(2)}
            </h4>

            {/* ⭐ NEW — Quantity Selector */}
            <div className="d-flex align-items-center mb-4">
              <button
                className="btn btn-outline-secondary px-3"
                onClick={() => qty > 1 && setQty(qty - 1)}
              >
                –
              </button>

              <span className="mx-3 fs-5 fw-bold">{qty}</span>

              <button
                className="btn btn-outline-secondary px-3"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 mb-4 flex-wrap">
              <button
                className="btn btn-warning px-4 py-2"
                onClick={() => {
                  addToCart({ ...product, qty }); // ⭐ ADD quantity
                  alert("Product added to cart!");
                }}
              >
                Add to Cart
              </button>

              <button
                className="btn btn-dark px-4 py-2"
                onClick={() =>
                  navigate("/checkout", {
                    state: { cart: [{ product, qty }] }, // ⭐ ADD quantity
                  })
                }
              >
                Buy Now
              </button>
            </div>

            <div className="mt-4">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Ratings:</strong> {product.ratings || "No ratings yet"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;
