import { Tabs, TabsContent } from "@/components/ui/tabs";
import TermsAndPolicyTabs from "./termsAndPolicy/TermsAndPolicyTabs";
import TermsAndCondition from "./termsAndPolicy/TermsAndCondition";
import PrivacyPolicy from "./termsAndPolicy/PrivacyPolicy";

const TermsAndPolicy = async ({ searchParams }) => {
  const { nestedTab } = await searchParams;

  return (
    <Tabs value={nestedTab} className="flex gap-6 h-full">
      <TermsAndPolicyTabs />

      <TabsContent value="terms-and-condition">
        <TermsAndCondition />
      </TabsContent>
      <TabsContent value="privacy-policy">
        <PrivacyPolicy />
      </TabsContent>
    </Tabs>
  );
};

export default TermsAndPolicy;
