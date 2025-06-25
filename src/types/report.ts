export type ReportStatus = "Pending" | "In Review" | "Resolved";

export interface IReport {
  _id: string;
  reportId: string;
  createdAt: string;
  reason: string;
  date: string;
  status: ReportStatus;
  reporter: {
    email: string;
  };
}
