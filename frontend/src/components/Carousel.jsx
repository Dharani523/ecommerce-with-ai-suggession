import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Carousel({ slides }) {
  return (
    <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={index}
          >
            <img
              src={slide.image}
              className="d-block w-100"
              alt={slide.title}
              style={{
                height: "550px", // 🔥 You can change this value
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
                // opacity: 0.9,
                borderRadius: "10px",
              }}
            />
            <div
              className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3"
              style={{ backdropFilter: "blur(4px)" }}
            >
              <h3 className="fw-bold text-warning">{slide.title}</h3>
              <p className="text-light">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#mainCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default Carousel;
