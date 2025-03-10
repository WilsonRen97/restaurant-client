import React, { useState, useEffect } from "react";
import RestaurantService from "../services/restaurant.service";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Restaurant } from "../interfaces/restaurant-interface";

interface StarImagProps {
  className?: string;
  size?: number;
}

interface MichelinRatingProps {
  michelinType: string;
}

const StarImag = (p: StarImagProps) => {
  let { className, size } = p;
  return (
    <img
      src="/images/star.png"
      alt="Star"
      className={`me-3 ${className || ""}`}
      style={{
        height: `${size}vw`,
        width: `${size}vw`,
      }}
    />
  );
};

const MichelinRating = (p: MichelinRatingProps) => {
  let { michelinType } = p;
  if (michelinType === "3-stars-michelin") {
    return (
      <div style={{ marginLeft: "10px", display: "flex" }}>
        <StarImag size={3} />
        <StarImag size={3} />
        <StarImag size={3} />
      </div>
    );
  } else if (michelinType === "2-stars-michelin") {
    return (
      <div style={{ marginLeft: "10px", display: "flex" }}>
        <StarImag size={3} />
        <StarImag size={3} />
      </div>
    );
  } else if (michelinType === "1-star-michelin") {
    return (
      <div style={{ marginLeft: "10px" }}>
        <StarImag size={3} />
      </div>
    );
  } else if (michelinType === "bib-gourmand") {
    return (
      <p
        style={{
          fontSize: "2vw",
          color: "#c02434",
          marginBottom: "0px",
        }}
      >
        &nbsp;&nbsp;(Bib-Gourmand)
      </p>
    );
  } else if (michelinType === "the-plate-michelin") {
    return (
      <p
        style={{
          fontSize: "2vw",
          color: "#c02434",
          marginBottom: "0px",
        }}
      >
        &nbsp;&nbsp;(Michelin Selected)
      </p>
    );
  }
  return null;
};

const HomeComponent = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const CustomPrevArrow = () => {
    return (
      <div
        style={{
          left: "10px",
          zIndex: 1,
          background: "grey",
        }}
      />
    );
  };

  const CustomNextArrow = () => {
    return (
      <div
        style={{
          right: "10px", // Set the position as needed
          zIndex: 1,
          background: "grey",
        }}
      />
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    arrows: true,
    accessibility: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  useEffect(() => {
    const fetchRandomRestaurants = async () => {
      try {
        const data = await RestaurantService.getRandomRestaurants();
        setRestaurants(data);
        console.log(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load random restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRestaurants();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  function shortenString(str: string) {
    if (str.length > 10) {
      return str.slice(0, 12) + "...";
    }
    return str;
  }

  return (
    <main>
      <div className="container py-4">
        <div className="home-grid mt-5">
          <h1 style={{ fontFamily: "Inter", fontSize: "10vw" }}>Taste</h1>
          <div className="d-flex align-items-center mt-3">
            <h1 style={{ fontFamily: "Inter", fontSize: "10vw" }}>the</h1>
            <div style={{ paddingLeft: "2vw" }}>
              <StarImag size={10}></StarImag>
              <StarImag size={10}></StarImag>
              <StarImag size={10}></StarImag>
            </div>
          </div>
          <h1 style={{ fontFamily: "Inter", fontSize: "10vw" }}>Stars</h1>
        </div>

        <div className="slider-container" style={{ padding: "30px" }}>
          <Slider {...settings}>
            <div>
              <img
                src={restaurants[0].image_url[0]}
                className="w-100 h-100"
                alt={restaurants[0].name}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "200%",
                  height: "90px",
                  left: "10px",
                  fontSize: "5vw",
                  color: "#fff",
                  backgroundColor: "black",
                  paddingTop: "20px",
                  paddingLeft: "10px",
                  fontFamily: "Inter",
                  fontStyle: "italic",
                }}
              >
                {shortenString(restaurants[0].name)}
                <MichelinRating
                  michelinType={restaurants[0].michelin_type}
                ></MichelinRating>
              </div>
            </div>
            <div>
              <img
                src={restaurants[0].image_url[1]}
                className="w-100 h-100"
                alt={restaurants[0].name}
              />
            </div>

            <div>
              <img
                src={restaurants[1].image_url[0]}
                className="w-100 h-100"
                alt={restaurants[1].name}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "200%",
                  height: "90px",
                  left: "10px",
                  fontSize: "5vw",
                  color: "#fff",
                  backgroundColor: "black",
                  paddingTop: "20px",
                  paddingLeft: "10px",
                  fontFamily: "Inter",
                  fontStyle: "italic",
                }}
              >
                {shortenString(restaurants[1].name)}
                <MichelinRating
                  michelinType={restaurants[1].michelin_type}
                ></MichelinRating>
              </div>
            </div>
            <div>
              <img
                src={restaurants[1].image_url[1]}
                className="w-100 h-100"
                alt={restaurants[1].name}
              />
            </div>
            <div>
              <img
                src={restaurants[2].image_url[0]}
                className="w-100 h-100"
                alt={restaurants[2].name}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "200%",
                  height: "90px",
                  left: "10px",
                  fontSize: "5vw",
                  color: "#fff",
                  backgroundColor: "black",
                  paddingTop: "20px",
                  paddingLeft: "10px",
                  fontFamily: "Inter",
                  fontStyle: "italic",
                }}
              >
                {shortenString(restaurants[2].name)}
                <MichelinRating
                  michelinType={restaurants[2].michelin_type}
                ></MichelinRating>
              </div>
            </div>
            <div>
              <img
                src={restaurants[2].image_url[1]}
                className="w-100 h-100"
                alt={restaurants[2].name}
              />
            </div>
          </Slider>
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
