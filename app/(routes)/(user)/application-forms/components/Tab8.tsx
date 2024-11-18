import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ApplicantData } from "@/types/ApplicantData";

interface Tab8Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
}

export const Tab8 = ({ formData, updateFormData }: Tab8Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Essay Admission Test</h2>
    </div>
  );
};
