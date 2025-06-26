export interface IBrand {
  _id: number | string;
  name: string;
  totalAssignedItems: number;
  createdAt: string;
  updatedAt: string;
  icon: string;

  category: {
    name: string;
  };
}
