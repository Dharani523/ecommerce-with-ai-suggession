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
            <div className="carousel-image-wrapper">
              <img
                src={slide.image}
                alt={slide.title}
                className="carousel-image"
              />
            </div>

            <div className="carousel-caption d-none d-md-block caption-glass">
              <h3 className="fw-bold text-warning">{slide.title}</h3>
              <p className="text-light">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}

export default Carousel;
