import { Tabs, TabsContent } from "@/components/ui/tabs";
import TermsAndPolicyTabs from "./termsAndPolicy/TermsAndPolicyTabs";
import TermsAndCondition from "./termsAndPolicy/TermsAndCondition";
import PrivacyPolicy from "./termsAndPolicy/PrivacyPolicy";
import Selling from "./termsAndPolicy/helpCenter/Selling";

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
      <TabsContent value="selling">
        <Selling />
      </TabsContent>
    </Tabs>
  );
};

export default TermsAndPolicy;
