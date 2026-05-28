import { GenericDTO } from "./common.interface";

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  category: GenericDTO;
  description?: string;
  imageUrl?: string;
}
