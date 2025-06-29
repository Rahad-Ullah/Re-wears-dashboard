export interface IProduct {
  _id: string;
  name: string;
  brand: {
    name: string;
  };
  productImage: string[];
  description: string;
  category: {
    category: {
      name: string;
    };
  };
  size: string;
  condition: "Like New" | "Very Good" | "Good" | "Fair";
  colors: string[];
  material: string;
  photos: string[];
  price: number;
  status: "Active" | "Blocked" | "Reported";
  createdAt: string;
}
