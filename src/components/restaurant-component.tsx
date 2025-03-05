// import modules
import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
// import restaurant service
import RestaurantService from "../services/restaurant.service";
// import interfaces
import { ComponentInterface } from "../interfaces/component-interface";
import { Restaurant } from "../interfaces/restaurant-interface";
// import other components
import CommentComponent from "./comment-component";
import FavoriteVisitedButtonComponent from "./favorite-save-button-component";
//import css
import "../styles/style.css";

const RestaurantComponent: React.FC<ComponentInterface> = ({
  currentUser,
  setCurrentUser,
}) => {
  const { id } = useParams(); //this state is only for url that contains :id
  const { theName } = useParams();
  const location = useLocation();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [showCommentArea, setShowCommentArea] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // useEffect 監聽依賴項: id, theName, location.pathname, favoritesActive, visitedActive
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = location.pathname.includes("/findByName")
          ? await RestaurantService.getRestaurantByName(theName ?? "")
          : await RestaurantService.getRestaurantById(id ?? "");

        setRestaurant(data);
        if (data.description) {
          setDescription(data.description);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error:" + err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, theName, location.pathname, refresh]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleCommentSubmit = async () => {
    console.log("handleCmmentSubmit call");
    try {
      if (restaurant && currentUser) {
        await RestaurantService.postComment(
          restaurant._id,
          content,
          currentUser.user._id
        );
        window.alert("Comment uploaded!");
        setContent(""); // Clear the input after submission
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      window.alert("Error adding comment:" + error);
    }
  };

  const handleEditToggle = () => setEditing(!editing);

  const handleSubmit = async () => {
    try {
      if (restaurant) {
        await RestaurantService.updateRestaurant(restaurant._id, description);
        setEditing(false);
      }
    } catch (err) {
      console.error("Error during save:", error);
      window.alert("Error during save:" + error);
    }
  };

  return (
    <>
      {restaurant ? (
        <div className="mx-3 md:mx-5 py-4 restaurant-page">
          {/*  Section 1: Restaurant Picture  */}
          <div className="mb-4 d-flex first-container">
            <div
              id="restaurantCarousel"
              className="carousel slide mb-4 w-50 picture-section"
              data-bs-ride="carousel"
              style={{ padding: "30px" }}
            >
              <div className="carousel-inner">
                {restaurant.image_url.map((url, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={url}
                      alt={`${restaurant.name} ${index + 1}`}
                      className="img-fluid rounded w-100 restaurant-img"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#restaurantCarousel"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#restaurantCarousel"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            {/*  Section 2: Description */}
            <div
              className="mb-4 w-50 ms-2 description-section"
              style={{ fontFamily: "Inter" }}
            >
              <h2 style={{ fontWeight: "bold", fontSize: "100px" }}>
                {restaurant.name}
              </h2>
              <p
                className="w-25 fs-6"
                style={{
                  color: "#c02434",
                  borderRadius: "4px",
                }}
              >
                {restaurant.michelin_type}
              </p>
              <p className="text-secondary fs-6">{restaurant.address}</p>

              {currentUser ? (
                <FavoriteVisitedButtonComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  restaurantId={restaurant._id}
                />
              ) : (
                ""
              )}

              <h4 className="fs-3 mt-4" style={{ marginTop: "1rem" }}>
                Description
              </h4>
              {/* Conditional rendering for buttons */}
              <>
                {currentUser === null ? (
                  // User is not logged in
                  <div>
                    <p className="fs-5">
                      {description || "No description available."}
                    </p>
                    <p>
                      Please <Link to="/login">log in</Link> to interact with
                      the restaurant.
                    </p>
                  </div>
                ) : (
                  <>
                    <p style={{ marginTop: "10px" }} className="fs-5">
                      {description || "No description available."}
                    </p>
                    {currentUser.user.role === "customer" ? (
                      // Logged-in user is a customer
                      <div>
                        <button
                          className="btn btn-dark"
                          onClick={() => setShowCommentArea(!showCommentArea)}
                        >
                          {showCommentArea ? "Cancel" : "Make a Comment"}
                        </button>
                        {showCommentArea && (
                          <div className="mt-3">
                            <textarea
                              className="form-control"
                              rows={3}
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              placeholder="Write your comment here..."
                            ></textarea>
                            <button
                              className="btn btn-primary mt-2"
                              onClick={handleCommentSubmit}
                            >
                              Submit Comment
                            </button>
                          </div>
                        )}
                      </div>
                    ) : currentUser.user.role === "restaurateur" ? (
                      // Logged-in user is a restaurateur
                      currentUser.user._id === restaurant.owner ? (
                        // Restaurateur is the owner
                        editing ? (
                          <div>
                            <textarea
                              className="fs-5"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              rows={5}
                              style={{
                                width: "100%",
                                fontSize: "1rem",
                                padding: "10px",
                                height: "250px",
                              }}
                            />
                            <button
                              onClick={handleSubmit}
                              className="btn btn-primary mt-2 me-2"
                            >
                              Save Changes
                            </button>
                            <button
                              onClick={handleEditToggle}
                              className="btn btn-secondary mt-2"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button
                              onClick={handleEditToggle}
                              className="btn btn-dark mt-2"
                            >
                              Edit Description
                            </button>
                          </div>
                        )
                      ) : (
                        <div>
                          <p>
                            <a
                              className="btn btn-danger"
                              data-bs-toggle="collapse"
                              href="#collapseExample"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample"
                            >
                              Are you the owner of this restaurant?
                            </a>
                          </p>
                          <div className="collapse" id="collapseExample">
                            <div className="card card-body">
                              If you are the owner of this restaurant, please
                              contact the admin to gain editing access for this
                              page.
                            </div>
                          </div>
                        </div>
                      ) // Restaurateur is not the owner
                    ) : null}
                  </>
                )}
              </>
            </div>
          </div>

          {/* Section 3: Comments */}
          <div>
            <CommentComponent comments={restaurant.comment}></CommentComponent>
          </div>
        </div>
      ) : (
        <p className="ms-4 mt-2 ps-1 fs-5" style={{ fontFamily: "Inter" }}>
          {" "}
          No such Restaurant, please search again.
        </p>
      )}
    </>
  );
};

export default RestaurantComponent;
