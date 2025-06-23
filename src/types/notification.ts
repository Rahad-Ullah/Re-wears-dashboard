export type NotificationCategory = "General" | "Order" | "Payment" | "Returns";
export type NotificationStatus = "Active" | "Draft";

export interface INotificationTemplate {
  _id: number;
  name: string;
  category: NotificationCategory;
  updatedAt: string;
  status: NotificationStatus;
  message: string;
}
