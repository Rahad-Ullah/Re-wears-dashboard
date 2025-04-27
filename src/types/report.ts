export type ReportStatus = "Pending" | "In Review" | "Resolved";
export type ReportType = "User" | "Message" | "Product";

export interface IReport {
  reportId: string;
  type: ReportType;
  content: string;
  reporter: string;
  reason: string;
  date: string;
  status: ReportStatus;
}
