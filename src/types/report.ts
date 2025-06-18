export type ReportStatus = "Pending" | "In Review" | "Resolved";

export interface IReport {
  reportId: string;
  createdAt: string;
  reason: string;
  date: string;
  status: ReportStatus;
  reporter: {
    email: string;
  };
}
