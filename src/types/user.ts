export interface IUser {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  role: string;
  image: string;
  dob: string;
  location: string;
  isVacation: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
}
