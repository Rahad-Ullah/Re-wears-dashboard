export interface ISize {
  _id: number;
  name: string;
  totalAssignedItems: number;
  createdAt: string;
  updatedAt: string;
  subCategory: {
    name: string;
    category: {
      name: string;
    };
  };
}
