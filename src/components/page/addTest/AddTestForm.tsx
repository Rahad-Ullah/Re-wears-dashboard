"use client";

import React from "react";
import Step1 from "@/components/multiStepForms/addTestForm/Step1";
import { Progress } from "@/components/ui/progress";
import { useTestFormContext } from "@/contexts/testFormContext";

const AddTestForm = () => {
  const { step, setStep } = useTestFormContext();

  const nextStep = () => setStep(step + 1);
  // const prevStep = () => setStep(step - 1);
  // const resetStep = () => setStep(1);

  return (
    <div className="bg-white p-6 rounded-xl grid gap-6 h-full">
      <div className="grid gap-2">
        <div className="flex justify-between gap-4 text-zinc-500">
          <h1 className="text-xl text-primary">Patient Details</h1>
          <span>{step}/6</span>
        </div>
        <Progress value={(100 / 6) * step} className="h-1 bg-zinc-200" />
      </div>
      <div className="">{step === 1 && <Step1 nextStep={nextStep} />}</div>
    </div>
  );
};

export default AddTestForm;
