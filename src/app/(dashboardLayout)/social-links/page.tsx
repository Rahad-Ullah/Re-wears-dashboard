import SocialLinks from "@/components/page/social/SocialLinks";
import { myFetch } from "@/utils/myFetch";

async function page() {
  const res = await myFetch("/social");

  return (
    <>
      <SocialLinks socialData={res?.data} />
    </>
  );
}

export default page;
