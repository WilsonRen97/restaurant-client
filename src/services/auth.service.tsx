import axios from "axios";

const API_URL =
  "https://restaurant-server-542.netlify.app/.netlify/functions/api/user";

class AuthService {
  login(email: string, password: string) {
    return axios.post(`${API_URL}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string, role: string) {
    return axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

let serviceObject = new AuthService();

export default serviceObject;
