export interface IBrand {
  _id: string;
  name: string;
  totalAssignedItems: number;
  createdAt: string;
  updatedAt: string;
  icon: string;
  category: {
    _id: string;
    name: string;
  };
}
