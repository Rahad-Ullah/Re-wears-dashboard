import AdminsTable from "@/components/page/admins/AdminsTable";

import { myFetch } from "@/utils/myFetch";
const AdminsPage = async ({ searchParams }) => {
  const { searchTerm, page } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
  });

  // Fetch data from the backend when backend is ready
  const res = await myFetch(`/users?${queryParams.toString()}`, {
    method: "GET",
    tags: ["Admins"],
  });

  // filter out super admin and minus him
  const filteredData = res?.data?.filter((item) => item?.role === "ADMIN");

  return (
    <>
      <AdminsTable users={filteredData} meta={res?.pagination} />
    </>
  );
};

export default AdminsPage;
