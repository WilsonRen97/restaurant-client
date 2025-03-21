import React, { useState } from "react";
// import layout and page components
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import WrongPathComponent from "./components/wrong-path-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import RestaurantComponent from "./components/restaurant-component";
import RestaurantListViewComponent from "./components/restaurant-list-view-component";
// import routes
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import services
import AuthService from "./services/auth.service";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route index element={<HomeComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route
            path="login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/api/restaurants/:id"
            element={
              <RestaurantComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/api/restaurants/findByName/:theName"
            element={
              <RestaurantComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="/api/restaurants/favrestaurant/:userID"
            element={
              <RestaurantListViewComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route path="*" element={<WrongPathComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
