import React, { useState, useEffect, useId } from "react";
import { Restaurant } from "../interfaces/restaurant-interface";
import { ComponentInterface } from "../interfaces/component-interface";
import RestaurantService from "../services/restaurant.service";
import RestaurantCard from "../components/restaurant-card-component";

type ListType = "favorites" | "visited";

const RestaurantListItemComponent: React.FC<
  ComponentInterface & { listType: ListType }
> = ({ currentUser, setCurrentUser, listType }) => {
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [visited, setVisited] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRestaurants = async () => {
      console.log("listType ", listType);
      try {
        const data = await RestaurantService.getUserRestaurantItems(
          currentUser!.user._id,
          listType
        );
        if (listType === "favorites") {
          setFavorites(data);
        } else {
          setVisited(data);
        }

        console.log("item log", data);
      } catch (err) {
        setError("Failed to load user favorite restaurants");
      }
    };

    fetchUserRestaurants();
  }, [currentUser, listType]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="list-item mt-4 ms-3">
      <h1>
        {listType === "favorites"
          ? "Favorite Restaurants"
          : "Visited Restaurants"}
      </h1>
      <div className="content mt-5">
        {listType === "favorites"
          ? favorites.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))
          : visited.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
      </div>
    </div>
  );
};

export default RestaurantListItemComponent;
