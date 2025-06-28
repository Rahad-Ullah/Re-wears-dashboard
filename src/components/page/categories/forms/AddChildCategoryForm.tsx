import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { revalidateTags } from "@/helpers/revalidateHelper";
import { myFetch } from "@/utils/myFetch";
import toast from "react-hot-toast";

export default function AddChildCategoryForm({ item }) {
  const handleAddChild = async (
    e: React.FormEvent<HTMLFormElement>,
    subCategory: string
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");

    try {
      const res = await myFetch(`/child-sub-category`, {
        method: "POST",
        body: { name, subCategory },
      });

      if (res.success) {
        toast.success(res.message || "Create child category successfully", {
          id: "child-category",
        });

        form.reset();

        await revalidateTags(["child-sub-category"]);
      } else {
        toast.error(res.message || "failed Sub category data", {
          id: "child-category",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => handleAddChild(e, String(item?._id))}
        className="grid gap-3"
      >
        <h1 className="text-lg font-semibold">Add Child Category</h1>
        <Label>Name</Label>
        <Input name="name" placeholder="Enter name" />
        <Button type="submit" className="ml-auto px-6">
          Save
        </Button>
      </form>
    </>
  );
}
