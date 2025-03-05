import React, { useState } from "react";
import { ComponentInterface } from "../interfaces/component-interface";
import RestaurantListItemComponent from "./restaurant-list-item-component";

const RestaurantListViewComponent: React.FC<ComponentInterface> = ({
  currentUser,
  setCurrentUser,
}) => {
  const [currentView, setCurrentView] = useState<"favorites" | "visited">(
    "favorites"
  );

  return (
    currentUser && (
      <div className="page-format">
        <div className="button-group">
          <button
            onClick={() => setCurrentView("favorites")}
            className={`toggle-button ${
              currentView === "favorites" ? "active" : ""
            }`}
          >
            Show Favorite Restaurants
          </button>
          <button
            onClick={() => setCurrentView("visited")}
            className={`toggle-button ${
              currentView === "visited" ? "active" : ""
            }`}
          >
            Show Visited Restaurants
          </button>
        </div>
        <hr style={{ width: "100%" }}></hr>
        {/* Conditionally render components based on currentView */}
        {currentView === "favorites" && (
          <div className="ms-5">
            <RestaurantListItemComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              listType={currentView}
            />
          </div>
        )}

        {currentView === "visited" && (
          <div className="ms-5">
            <RestaurantListItemComponent
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              listType={currentView}
            />
          </div>
        )}
      </div>
    )
  );
};

export default RestaurantListViewComponent;
