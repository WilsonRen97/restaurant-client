export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  image_url: string[];
  michelin_type: string;
  comment: string[];
  description: string;
  owner: string | null;
}
