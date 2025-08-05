export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: string; // ISO date string in JSON responses
  updatedAt: string; // ISO date string in JSON responses
}
