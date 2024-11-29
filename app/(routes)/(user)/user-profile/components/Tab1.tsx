import React from "react";

import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import useApplicantData from "@/hooks/use-applicant-data";

export const Tab1 = () => {
  const { applicantData } = useApplicantData();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Personal Information Section */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Personal Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                type="text"
                value={applicantData?.firstName || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                type="text"
                value={applicantData?.lastName || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="text"
                value={applicantData?.age || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <Input
                type="text"
                value={applicantData?.gender || ""}
                readOnly={true}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nationality
              </label>
              <Input
                type="text"
                value={applicantData?.nationality || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Religion</label>
              <Input
                type="text"
                value={applicantData?.religion || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birthdate
              </label>
              <Input
                type="text"
                value={
                  applicantData?.birthdate &&
                  !isNaN(new Date(applicantData.birthdate as Date).getTime())
                    ? new Date(applicantData.birthdate as Date)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birthplace
              </label>
              <Input
                type="text"
                value={applicantData?.birthplace || ""}
                readOnly={true}
              />
            </div>
          </div>

          {/* Civil Status & Family Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Civil Status
              </label>
              <Input
                type="text"
                value={applicantData?.civilStatus || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birth Rank
              </label>
              <Input
                type="text"
                value={applicantData?.birthRank || ""}
                readOnly={true}
              />
            </div>
          </div>

          {/* Family Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Brothers
              </label>
              <Input
                type="text"
                value={applicantData?.numBrothers || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Number of Sisters
              </label>
              <Input
                type="text"
                value={applicantData?.numSisters || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Brothers/Sisters at CIT
              </label>
              <Input
                type="text"
                value={applicantData?.numCITBrothersSisters || ""}
                readOnly={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Address Information */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Address Information</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Home Address
              </label>
              <Input
                type="text"
                value={applicantData?.homeAddress || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                City Address
              </label>
              <Input
                type="text"
                value={applicantData?.cityAddress || ""}
                readOnly={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media Accounts */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Social Media Accounts</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Facebook URL
              </label>
              <Input
                type="text"
                value={applicantData?.facebookURL || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number
              </label>
              <Input
                type="text"
                value={applicantData?.mobileNumber || ""}
                readOnly={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
