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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/products", {
        params: { search: searchQuery, category: categoryQuery },
      })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [searchQuery, categoryQuery]);

  const slides = [
    {
      image: "/images/img5.png",
      title: "Discover New Gadgets",
      description: "Shop the latest and greatest tech trends.",
    },
    {
      image: "/images/img6.png",
      title: "Stylish Laptops",
      description: "Work smarter with our premium laptop collection.",
    },
    {
      image: "/images/img1.png",
      title: "Accessories You’ll Love",
      description: "Enhance your tech experience with style.",
    },
  ];

  return (
    <>
      <AIAssistant context={{ search: searchQuery, category: categoryQuery }} />

      <Carousel slides={slides} />

      {/* 🔥 Wider container to remove side spaces */}
      <div className="product-list mt-5">

        <div className="row gy-4 gx-3">

          {loading ? (
            <p className="text-center fs-5">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center fs-5">No products found.</p>
          ) : (
            products.map((p) => (
              <div key={p._id} className="col-lg-3 col-md-4 col-sm-6 col-12">
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
