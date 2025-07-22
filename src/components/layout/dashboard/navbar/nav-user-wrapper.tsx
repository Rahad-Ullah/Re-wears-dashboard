import { NavUser } from "./nav-user";
import { myFetch } from "@/utils/myFetch";

const NavUserWrapper = async () => {
  const res = await myFetch("/users/profile", {
    tags: ["user-profile"],
  });

  // const name = red

  return <NavUser user={res.data} />;
};

export default NavUserWrapper;
