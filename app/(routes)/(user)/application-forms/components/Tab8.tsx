import { Textarea } from "@/components/ui/textarea";

import { ApplicantData } from "@/types/ApplicantData";
import { examQuestionnaires } from "@/data";

interface Tab8Props {
  formData: ApplicantData;
  updateFormData: (newData: Partial<ApplicantData>) => void;
  isSubmitted: boolean;
}

export const Tab8 = ({ formData, updateFormData, isSubmitted }: Tab8Props) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // Find the selected exam set
  const selectedSet = examQuestionnaires.find(
    (set) => set.set === formData.examSet
  );

  // Map question index to corresponding formData keys
  const answerKeys = [
    "firstQuestionAnswer",
    "secondQuestionAnswer",
    "thirdQuestionAnswer",
    "fourthQuestionAnswer",
    "fifthQuestionAnswer",
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-lg font-bold text-center">Essay Admission Test</h2>

      {/* Instructions */}
      {isSubmitted && (
        <p className="text-sm text-red-600 italic">
          Note: Submitted answers cannot be changed anymore.
        </p>
      )}

      {/* Exam Set Selection */}
      <label className="block">
        <span className="font-medium">Choose Exam Set*:</span>
        <div className="flex flex-col mt-1">
          {["Set A", "Set B", "Set C", "Set D"].map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="radio"
                name="examSet"
                required
                disabled={isSubmitted}
                value={option}
                checked={formData.examSet === option}
                onChange={handleInputChange}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </label>

      {/* Render Questions Dynamically */}
      {selectedSet ? (
        selectedSet.questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <label className="block">
              <span className="font-medium">
                Question {index + 1}: {question}*
              </span>
              <Textarea
                name={answerKeys[index]} // Use specific keys
                required
                readOnly={isSubmitted}
                placeholder="Enter your answer."
                value={
                  formData[answerKeys[index] as keyof ApplicantData] as string
                }
                onChange={handleInputChange}
                className="w-full mt-1"
              />
            </label>
          </div>
        ))
      ) : (
        <p className="text-sm text-red-500">Please select an exam set.</p>
      )}
    </div>
  );
};
