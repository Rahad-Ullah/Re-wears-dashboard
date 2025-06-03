import { IUser } from "@/types/user";
import { Star } from "lucide-react";

const UserDetails = ({ user }: { user: IUser }) => {
  console.log(user);

  return (
    <div className="grid gap-4">
      <p className="grid grid-cols-2 gap-4 items-center">
        <span>Listed Products</span>
        <strong>20</strong>
      </p>
      <p className="grid grid-cols-2 gap-4 items-center">
        <span>Sold Products</span>
        <strong>12</strong>
      </p>
      <p className="grid grid-cols-2 gap-4 items-center">
        <span>Review</span>
        <strong className="flex items-center gap-2">
          <Star size={20} className="text-amber-500" /> 4.5
        </strong>
      </p>
    </div>
  );
};

export default UserDetails;
