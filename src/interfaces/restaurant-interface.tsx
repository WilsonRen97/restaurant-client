import { CommentInterface } from "./comment-interface";

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  image_url: string[];
  michelin_type: string;
  comment: CommentInterface[];
  description: string;
  owner: string | null;
}
