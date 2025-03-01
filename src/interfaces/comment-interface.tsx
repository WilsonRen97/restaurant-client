import { User } from "../interfaces/user-interface";
import { Restaurant } from "../interfaces/restaurant-interface";

export interface CommentInterface {
  _id: string;
  text: string;
  createdBy: User;
  restaurant: Restaurant;
  date: Date;
}

export interface CommentCollection {
  comments: CommentInterface[];
}
