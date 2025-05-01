"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TermsAndCondition = () => {

  return (
    <Card className="p-4 h-full flex flex-col justify-between gap-4 shadow-sm">
      <div className="flex justify-end">
        <Button className="px-10">Update</Button>
      </div>
    </Card>
  );
};

export default TermsAndCondition;
