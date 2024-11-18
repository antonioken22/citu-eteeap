import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ApplicantData } from "@/types/ApplicantData";

interface Tab7Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
}

export const Tab7 = ({ formData, updateFormData }: Tab7Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Undertaking/Waiver</h2>
    </div>
  );
};
