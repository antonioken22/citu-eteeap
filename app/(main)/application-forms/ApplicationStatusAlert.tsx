"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type ApplicationStatusAlertProps = {
  applicationStatus?: string | null;
  isSubmitted: boolean;
};

export const ApplicationStatusAlert = ({
  applicationStatus,
  isSubmitted,
}: ApplicationStatusAlertProps) => {
  if (!isSubmitted) return null;

  let statusTitle = "Unreviewed";
  let statusDescription = "Your application has not been reviewed yet.";
  let alertClassNames =
    "border-muted-foreground bg-muted text-muted-foreground"; // Default styles for unreviewed

  switch (applicationStatus) {
    case "INC Document":
      statusTitle = "Lacking Documents";
      statusDescription =
        "Some required documents are missing. Please provide the necessary files.";
      alertClassNames = "border-purple-600 bg-purple-200 text-purple-600";
      break;
    case "Declined":
      statusTitle = "For Further Assessment";
      statusDescription =
        "Your application requires further assessment. Please contact the in-charge for more details.";
      alertClassNames = "border-orange-600 bg-orange-200 text-orange-600";
      break;
    case "Transferred":
      statusTitle = "For Evaluation";
      statusDescription =
        "Your application has been forwarded for evaluation by the ETEEAP Coordinator/Director.";
      alertClassNames = "border-green-600 bg-green-200 text-green-600";
      break;
  }

  return (
    <Alert
      className={`mt-4 flex flex-row justify-start items-center space-x-4 ${alertClassNames}`}
    >
      <div>
        <AlertCircle className="w-8 h-8" />
      </div>
      <div>
        <AlertTitle>{statusTitle}</AlertTitle>
        <AlertDescription>{statusDescription}</AlertDescription>
      </div>
    </Alert>
  );
};
