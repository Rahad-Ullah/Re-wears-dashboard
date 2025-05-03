import { Tabs, TabsContent } from "@/components/ui/tabs";
import TermsAndPolicyTabs from "./termsAndPolicy/TermsAndPolicyTabs";
import TermsAndCondition from "./termsAndPolicy/TermsAndCondition";
import PrivacyPolicy from "./termsAndPolicy/PrivacyPolicy";
import Selling from "./termsAndPolicy/helpCenter/Selling";
import Buying from "./termsAndPolicy/helpCenter/Buying";
import Shipping from "./termsAndPolicy/helpCenter/Shipping";
import Payments from "./termsAndPolicy/helpCenter/Payments";

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
      <TabsContent value="buying">
        <Buying />
      </TabsContent>
      <TabsContent value="shipping">
        <Shipping />
      </TabsContent>
      <TabsContent value="payments">
        <Payments />
      </TabsContent>
    </Tabs>
  );
};

export default TermsAndPolicy;
