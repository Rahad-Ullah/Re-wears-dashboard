import UsersTable from "@/components/page/users/UsersTable";
import { myFetch } from "@/utils/myFetch";
const UsersPage = async ({ searchParams }) => {
  const {
    role,
    location,
    gender,
    searchTerm,
    page,
    sort = "asc",
  } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
    ...(role && { role }),
    ...(gender && { gender }),
    ...(location && { location }),
    ...(searchTerm && { searchTerm }),
    ...(page && { page }),
    ...(sort && { sort }),
  });

  // Fetch data from the backend when backend is ready
  const res = await myFetch(`/users?${queryParams.toString()}`, {
    tags: ["users"],
  });
  // filter out super admin and minus him
  const filteredData = res.data.filter((item) => item?.role !== "SUPER_ADMIN");

  return (
    <>
      <UsersTable
        users={filteredData}
        meta={{ page: 1, totalPage: 1, total: 12 } as never}
        filters={{ role }}
      />
    </>
  );
};

export default UsersPage;
