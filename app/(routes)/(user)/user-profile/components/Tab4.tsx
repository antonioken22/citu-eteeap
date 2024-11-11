import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Tab4 = ({ formData, updateFormData, handleTabChange }: any) => {
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    updateFormData({
      [name]: name === "birthdate" ? new Date(value) : value,
    });
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Requirement Documents</h2>
      {/* Previous and Next buttons */}
      <div className="flex justify-between mt-8">
        <Button className="px-4 py-2 " onClick={() => handleTabChange("tab3")}>
          Previous
        </Button>
        <Button className="px-4 py-2 " onClick={() => handleTabChange("tab5")}>
          Next
        </Button>
      </div>
    </div>
  );
};
