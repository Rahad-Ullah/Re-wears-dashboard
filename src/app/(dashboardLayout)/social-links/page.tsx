import SocialLinks from "@/components/page/social/SocialLinks";
import { myFetch } from "@/utils/myFetch";

async function page() {
  const res = await myFetch("/social");
  console.log(res);
  return (
    <>
      <SocialLinks socialData={res?.data} />
    </>
  );
}

export default page;
