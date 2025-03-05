import axios from "axios";

const API_URL = "http://localhost:8080/api/restaurants";
const Comment_URL = "http://localhost:8080/api/comments";
type ErrorWithMessage = { message: string };

class RestaurantService {
  private token: string;

  constructor() {
    const user = localStorage.getItem("user");
    this.token = user ? JSON.parse(user).token : "";
  }

  async getRestaurantById(id: string) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorWithMessage = error as ErrorWithMessage;
        throw new Error(errorWithMessage.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async getRestaurantByName(name: string) {
    try {
      const response = await axios.get(`${API_URL}/findByName/${name}`);
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorWithMessage = error as ErrorWithMessage;
        throw new Error(errorWithMessage.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async postComment(id: string, content: string, userID: string) {
    try {
      const response = await axios.post(
        `${Comment_URL}/${id}`,
        { content, user: userID },
        { headers: { Authorization: this.token } }
      );
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorWithMessage = error as ErrorWithMessage;
        throw new Error(errorWithMessage.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async updateRestaurant(restaurantId: string, description: string) {
    try {
      const response = await axios.put(
        `${API_URL}/${restaurantId}/description`,
        { description },
        { headers: { Authorization: this.token } }
      );
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorWithMessage = error as ErrorWithMessage;
        throw new Error(errorWithMessage.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async saveToList(userId: string, restaurantId: string, listType: string) {
    try {
      const response = await axios.put(
        `${API_URL}/savelist/${restaurantId}/${userId}/${listType}`,
        {},
        { headers: { Authorization: this.token } }
      );
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorWithMessage = error as ErrorWithMessage;
        throw new Error(errorWithMessage.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async deleteFromList(userId: string, restaurantId: string, listType: string) {
    try {
      const response = await axios.put(
        `${API_URL}/deletelist/${restaurantId}/${userId}/${listType}`,
        {},
        { headers: { Authorization: this.token } }
      );
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorWithMessage = error as ErrorWithMessage;
        throw new Error(errorWithMessage.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async getRandomRestaurants() {
    try {
      const response = await axios.get(`${API_URL}/gallery/random-restaurants`);
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorWithMessage = error as ErrorWithMessage;
        throw new Error(errorWithMessage.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }

  async getUserRestaurantItems(id: string, listType: string) {
    try {
      const response = await axios.get(`${API_URL}/favrestaurant/${id}`, {
        params: { listType },
      });
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "message" in error) {
        const errorWithMessage = error as ErrorWithMessage;
        throw new Error(errorWithMessage.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

let serviceObject = new RestaurantService();
export default serviceObject;
