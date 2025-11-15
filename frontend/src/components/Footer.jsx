import React from "react";

function Footer() {
  return (
    <footer
      className="glass-footer mt-5 py-4"
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.25)",
        borderTop: "1px solid rgba(255,255,255,0.4)",
      }}
    >
      <div className="container text-center">

        {/* Logo */}
        <h3 className="fw-bold text-dark mb-3">glassyKart 🛍️</h3>

        {/* Social Icons only */}
        <div className="d-flex justify-content-center gap-3 mb-3">
          <a className="social-icon" href="#">
            <i className="bi bi-facebook"></i>
          </a>
          <a className="social-icon" href="#">
            <i className="bi bi-instagram"></i>
          </a>
          <a className="social-icon" href="#">
            <i className="bi bi-twitter"></i>
          </a>
          <a className="social-icon" href="#">
            <i className="bi bi-youtube"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-dark mb-0">
          © {new Date().getFullYear()} <b>glassyKart</b>. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
