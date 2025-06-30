import UsersTable from "@/components/page/users/UsersTable";
import { myFetch } from "@/utils/myFetch";
const UsersPage = async ({ searchParams }) => {
  const {
    location,
    gender,
    searchTerm,
    page,
    sort = "asc",
  } = await searchParams;

  // Build query parameters for the backend request
  const queryParams = new URLSearchParams({
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

  console.log(res);

  // filter out super admin and minus him
  const filteredData = res?.data?.filter((item) => item?.role === "USER");

  return (
    <>
      <UsersTable
        users={filteredData}
        meta={res?.pagination}
        filters={{ location, gender, searchTerm }}
      />
    </>
  );
};

export default UsersPage;
