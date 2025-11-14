import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../axiosInstance";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import AIAssistant from "../components/AIAssistant";

function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";
  const categoryQuery = queryParams.get("category") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products", {
        params: { search: searchQuery, category: categoryQuery },
      })
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, [searchQuery, categoryQuery]);

  const slides = [
    {
      image:"/images/img3.png",
      title: "Discover New Gadgets",
      description: "Shop the latest and greatest tech trends.",
    },
    {
      image:
        "/images/img2.png",
      title: "Stylish Laptops",
      description: "Work smarter with our premium laptop collection.",
    },
    {
      image:
        "/images/img1.png",
      title: "Accessories You’ll Love",
      description: "Enhance your tech experience with style.",
    },
  ];

  return (
    <>
      <AIAssistant
        context={{ search: searchQuery, category: categoryQuery }}
      />

      <Carousel slides={slides} />

      <div className="container mt-5">
        {/* <h2 className="text-center mb-4 fw-bold">🔥 Featured Products</h2> */}
        <div className="row g-4">
          {products.length === 0 ? (
            <p className="text-center">No products found.</p>
          ) : (
            products.map((p) => (
              <div key={p._id} className="col-lg-4 col-md-6 col-sm-12">
                <ProductCard product={p} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
