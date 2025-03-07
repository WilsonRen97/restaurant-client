import { useState, useEffect } from "react";
import RestaurantService from "../services/restaurant.service";
import AuthService from "../services/auth.service";
import { ComponentInterface } from "../interfaces/component-interface";

const FavoriteVisitedButtonComponent: React.FC<
  ComponentInterface & { restaurantId: string }
> = ({ currentUser, restaurantId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isVisited, setIsVisited] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      const localUser = AuthService.getCurrentUser();
      if (localUser) {
        setIsFavorite(localUser.user.likedRestaurants.includes(restaurantId));
        setIsVisited(localUser.user.visitedRestaurants.includes(restaurantId));
      }
    };

    fetchData();
  }, [restaurantId]);

  // Handle adding/removing from favorites
  const toggleFavorite = async () => {
    if (!currentUser) {
      window.alert("Error occur. Please try again.");
      return;
    }

    if (!isFavorite) {
      try {
        const data = await RestaurantService.saveToList(
          currentUser.user._id,
          restaurantId,
          "favorites"
        );

        const updatedData = {
          ...data,
          token: currentUser.token,
        };

        localStorage.setItem("user", JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    } else {
      try {
        const data = await RestaurantService.deleteFromList(
          currentUser.user._id,
          restaurantId,
          "favorites"
        );
        const updatedData = {
          ...data, // Spread the existing properties from the `data` object
          token: currentUser.token, // Add the `token` property
        };

        localStorage.setItem("user", JSON.stringify(updatedData));
        console.log(data);
        // Toggle favorite status
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    }
    setIsFavorite(!isFavorite);
  };

  // Handle adding/removing from visited list
  const toggleVisited = async () => {
    if (!currentUser) {
      window.alert("Error occur. Please try again.");
      return;
    }

    if (!isVisited) {
      try {
        const data = await RestaurantService.saveToList(
          currentUser.user._id,
          restaurantId,
          "visited"
        );
        const updatedData = {
          ...data, // Spread the existing properties from the `data` object
          token: currentUser.token, // Add the `token` property
        };

        localStorage.setItem("user", JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error toggling visited:", error);
      }
    } else {
      try {
        const data = await RestaurantService.deleteFromList(
          currentUser.user._id,
          restaurantId,
          "visited"
        );
        const updatedData = {
          ...data, // Spread the existing properties from the `data` object
          token: currentUser.token, // Add the `token` property
        };

        localStorage.setItem("user", JSON.stringify(updatedData));
      } catch (error) {
        console.error("Error toggling visited:", error);
      }
    }
    setIsVisited(!isVisited);
  };

  return (
    <div className="d-flex">
      <button
        className="me-2 btn"
        style={{
          backgroundColor: isFavorite ? "#c02434" : "#D9D9D9",
          color: isFavorite ? "white" : "black",
        }}
        onClick={toggleFavorite}
      >
        {isFavorite ? "Favorites" : "Save as Favorite"}
      </button>

      <button
        className="btn"
        onClick={toggleVisited}
        style={{
          backgroundColor: isVisited ? "#c02434" : "#D9D9D9",
          color: isVisited ? "white" : "black",
        }}
      >
        {isVisited ? "Visited" : "Mark as Visited"}
      </button>
    </div>
  );
};

export default FavoriteVisitedButtonComponent;
