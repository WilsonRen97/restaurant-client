import React from "react";
import { useNavigate } from "react-router-dom";
import { Restaurant } from "../interfaces/restaurant-interface";

const RestaurantCardComponent: React.FC<{ restaurant: Restaurant }> = ({
  restaurant,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/api/restaurants/${restaurant._id}`);
  };
  return (
    <div
      className="restaurant-card"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: "1px solid #ddd",
        borderRadius: "4px",
        overflow: "hidden",
        transition: "transform 0.2s",
        width: "330px",
        height: "360px",
        boxShadow: "5px 5px 5px #D3D3D3",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={restaurant.image_url[0]}
        alt={restaurant.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "16px", fontFamily: "Inter" }}>
        <h3 style={{ margin: "0 0 8px" }}>{restaurant.name}</h3>
        <p style={{ margin: "0", color: "#555" }}>{restaurant.address}</p>
      </div>
    </div>
  );
};

export default RestaurantCardComponent;
