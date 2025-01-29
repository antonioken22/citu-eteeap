"use client";

import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import { ApplicantData } from "@/types/ApplicantData";

export const ParentsInformation = ({
  applicantData,
}: {
  applicantData: ApplicantData;
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Father's Profile */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Father&apos;s Profile</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                type="text"
                value={applicantData?.fatherName || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="text"
                value={applicantData?.fatherAge || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birthplace
              </label>
              <Input
                type="text"
                value={applicantData?.fatherBirthplace || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Nationality
              </label>
              <Input
                type="text"
                value={applicantData?.fatherNationality || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Religion</label>
              <Input
                type="text"
                value={applicantData?.fatherReligion || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Highest Educational Attainment
              </label>
              <Input
                type="text"
                value={applicantData?.fatherEducation || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Occupation
              </label>
              <Input
                type="text"
                value={applicantData?.fatherOccupation || ""}
                readOnly={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* Mother's Profile */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Mother&apos;s Profile</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                type="text"
                value={applicantData?.motherName || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="text"
                value={applicantData?.motherAge || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Birthplace
              </label>
              <Input
                type="text"
                value={applicantData?.motherBirthplace || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Nationality
              </label>
              <Input
                type="text"
                value={applicantData?.motherNationality || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Religion</label>
              <Input
                type="text"
                value={applicantData?.motherReligion || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Highest Educational Attainment
              </label>
              <Input
                type="text"
                value={applicantData?.motherEducation || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Occupation
              </label>
              <Input
                type="text"
                value={applicantData?.motherOccupation || ""}
                readOnly={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Emergency Contact</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Name
              </label>
              <Input
                type="text"
                value={applicantData?.emergencyContactName || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number
              </label>
              <Input
                type="text"
                value={applicantData?.emergencyContactNumber || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Relation</label>
              <Input
                type="text"
                value={applicantData?.emergencyContactRelationship || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <Input
                type="text"
                value={applicantData?.emergencyContactAddress || ""}
                readOnly={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
