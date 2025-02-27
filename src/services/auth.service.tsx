import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:3000/api/user";

interface User {
  username: string;
  email: string;
  password: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

class AuthService {
  login(
    email: string,
    password: string
  ): Promise<AxiosResponse<LoginResponse>> {
    return axios.post<LoginResponse>(`${API_URL}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem("user");
  }

  register(
    username: string,
    email: string,
    password: string,
    role: string
  ): Promise<AxiosResponse<User>> {
    return axios.post<User>(`${API_URL}/register`, {
      username,
      email,
      password,
      role,
    });
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    return user ? (JSON.parse(user) as User) : null;
  }
}

export default new AuthService();
