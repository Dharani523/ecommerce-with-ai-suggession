import React from "react";

function About() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-white text-center py-5"
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1523275335684-37898b6baf30') center/cover no-repeat",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h1 className="fw-bold display-5">About Our Store</h1>
          <p className="lead mt-3">
            We bring premium quality products right to your doorstep 🚚
          </p>
        </div>
      </section>

      {/* About Description */}
      <section className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Who We Are</h2>
            <p className="text-muted">
              We are a passionate team dedicated to offering top-notch fashion,
              electronics, and lifestyle products. Our goal is to make online
              shopping effortless, enjoyable, and affordable for everyone.
            </p>
            <p className="text-muted">
              With a commitment to quality and innovation, we continuously
              strive to enhance your shopping experience by bringing the latest
              trends and trusted brands.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://www.cloudways.com/blog/wp-content/uploads/Ecommerce-Shopping-Infographics.png"
              alt="About us"
              className="img-fluid rounded-4 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Our Vision & Mission</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">
                  <h4 className="fw-bold mb-3">🎯 Our Vision</h4>
                  <p className="text-muted">
                    To become the most trusted and loved e-commerce destination
                    by providing a seamless and personalized shopping experience
                    to every customer.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">
                  <h4 className="fw-bold mb-3">🚀 Our Mission</h4>
                  <p className="text-muted">
                    To deliver excellence in every product we sell, maintain
                    transparency, and ensure 100% customer satisfaction through
                    continuous improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">💬 What Our Customers Say</h2>
        <div className="row g-4">
          {[
            {
              name: "Priya Sharma",
              review:
                "Amazing service and great product quality! I always shop here for the latest trends.",
            },
            {
              name: "Rahul Verma",
              review:
                "Super fast delivery and excellent customer support. Highly recommend!",
            },
            {
              name: "Anjali Gupta",
              review:
                "Beautiful collection and trustworthy sellers. My favorite shopping site!",
            },
          ].map((r, i) => (
            <div className="col-md-4" key={i}>
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body text-center">
                  <p className="text-muted">“{r.review}”</p>
                  <h6 className="fw-bold mt-3">{r.name}</h6>
                  <div className="text-warning mt-2">
                    ⭐⭐⭐⭐⭐
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-1">© {new Date().getFullYear()} SmartShop. All rights reserved.</p>
        <small>Designed with ❤️ by Dharanidharan</small>
      </footer>
    </div>
  );
}

export default About;
