export interface IProduct {
  _id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL" | "4XL";
  condition: "Like New" | "Very Good" | "Good" | "Fair";
  colors: string[];
  material: string;
  photos: string[];
  price: number;
  status: "Active" | "Blocked" | "Reported";
}