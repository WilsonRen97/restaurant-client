interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  likedRestaurants: string[];
  createdRestaurants: string[];
  visitedRestaurants: string[];
  date: string;
  __v: number;
}

export interface CurrentUser {
  message: string;
  token: string;
  user: User;
}
