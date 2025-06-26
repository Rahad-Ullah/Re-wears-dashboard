export interface IBrand {
  _id: number;
  name: string;
  totalAssignedItems: number;
  createdAt: string;
  updatedAt: string;
  icon: string;
  category: {
    name: string;
  };
}
