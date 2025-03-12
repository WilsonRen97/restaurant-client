# 🍜 Tasty in Taiwan

A modern restaurant discovery platform for food enthusiasts exploring Michelin-starred dining in Taiwan. Built with **React.js** and **TypeScript**, Tasty in Taiwan allows users to search, review, and favorite restaurants, with separate experiences for customers and restauranteurs.

## Instruction

### Local Environment

1. Download the project (clone or zip).
2. Navigate to the project's folder.
3. Run: `npm install` to install all necessary dependencies. This command should add a "node_modules" folder in the project folder.
4. Run: `npm start` to start the React server.

### Problems?

- If `npm install` fails, make sure you have Node.js installed.
- If `npm start` fails, check the terminal for error messages.

## API used

### Restaurant API

This is a self-developed RESTful API, made with Node.js, Express, and MongoDB. It provides secure user authentication via Passport.js and JWT, and manages data for users, Michelin-rated restaurants (2024), and user comments.

1. Authentication: JWT-based stateless authentication with Passport.js for secure user login and registration.
2. MongoDB Integration: MongoDB for storing and retrieving user profiles, detailed 2024 Michelin restaurant data (including stars, address, and descriptions), and user-generated comments.
3. RESTful Architecture: Well-defined endpoints for seamless interaction with users, restaurants, and comments.

## Features

### Discover Restaurants

- Explore a comprehensive database of **Michelin-starred restaurants** in Taiwan (3-star, 2-star, and 1-star).
- Homepage displays **3 random restaurants** from the database to inspire your next dining experience.

### User Roles

- **Customer:**

  - Register to leave comments and share your dining experiences.
  - Mark restaurants as **visited** or **favorite**.
  - Access **"myRestaurant"** to view your visited or favorite spots.

- **Restauranteur:**
  - Register to **claim ownership** of a restaurant by contacting the admin.
  - **Edit restaurant descriptions** once ownership is verified.
  - Mark restaurants as **visited** or **favorite**.
  - Access **"myRestaurant"** to manage your claimed restaurant.
