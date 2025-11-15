import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../axiosInstance";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQueryFromUrl = queryParams.get("search") || "";
  const categoryQueryFromUrl = queryParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState(searchQueryFromUrl);
  const [categoryQuery, setCategoryQuery] = useState(categoryQueryFromUrl);
  const [categories, setCategories] = useState([]);

  // ⭐ Auto close navbar on mobile
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarContent");
    if (navbar) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };

  // Fetch categories
  useEffect(() => {
    axios
      .get("/products/categories")
      .then((res) => setCategories(res.data.categories))
      .catch((err) => console.log("Category fetch error:", err));
  }, []);

  // Live search update
  useEffect(() => {
    if (location.pathname === "/") {
      const timer = setTimeout(() => {
        navigate(`/?search=${searchQuery}&category=${categoryQuery}`);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, categoryQuery, navigate, location.pathname]);

  return (
    <nav className="navbar navbar-dark navbar-expand-lg navbar-glass fixed-top shadow-sm">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/" onClick={closeNavbar}>
          glassykart🛍️
        </Link>

        {/* Mobile toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible area */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Search + Category */}
          <div className="d-flex flex-column flex-lg-row gap-2 mx-lg-auto mt-3 mt-lg-0">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              className="form-select"
              value={categoryQuery}
              onChange={(e) => setCategoryQuery(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Nav buttons */}
          <ul className="navbar-nav ms-lg-4 mt-3 mt-lg-0 d-flex align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link className="btn btn-outline-dark w-100" to="/" onClick={closeNavbar}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-dark w-100" to="/cart" onClick={closeNavbar}>
                Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-dark w-100" to="/about" onClick={closeNavbar}>
                About
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
