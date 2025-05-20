import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { IUser } from "@/types/user";
import { myFetch } from "@/utils/myFetch";
import { Star } from "lucide-react";
import toast from "react-hot-toast";

const UserDetails = ({ user }: { user: IUser }) => {
  // handle update user role
  const updateUserRole = async (role: string) => {
    try {
      const res = await myFetch(`/users/${user?._id}`, {
        method: "PATCH",
        body: { role },
      });
      if (res.success) {
        revalidateTags(["users", "user-profile"]);
        toast.success(res.message || "Updated successfully");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <p className="grid grid-cols-2 gap-4 items-center">
        <span>Assign Role</span>
        <Select
          defaultValue={user?.role}
          onValueChange={(e) => updateUserRole(e)}
        >
          <SelectTrigger className="h-10 max-w-40">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="USER">User</SelectItem>
          </SelectContent>
        </Select>
      </p>
    </div>
  );
};

export default UserDetails;
