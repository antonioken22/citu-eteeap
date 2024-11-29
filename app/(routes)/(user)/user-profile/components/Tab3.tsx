import React from "react";

import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

import useApplicantData from "@/hooks/use-applicant-data";

export const Tab3 = () => {
  const { applicantData } = useApplicantData();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">School Attended</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Previous Course (if Transferee/College Graduate)
            </label>
            <Input
              type="text"
              value={applicantData?.prevCourse || ""}
              readOnly={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Last School Attended
            </label>
            <Input
              type="text"
              value={applicantData?.lastSchool || ""}
              readOnly={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Previous School Address
            </label>
            <Input
              type="text"
              value={applicantData?.prevSchoolAddress || ""}
              readOnly={true}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                School Year
              </label>
              <Input
                type="text"
                value={applicantData?.schoolYear || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                School Type
              </label>
              <Input
                type="text"
                value={applicantData?.schoolType || ""}
                readOnly={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col md:flex-row gap-6">
        {/* High School */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">High School</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Complete Name of School
              </label>
              <Input
                type="text"
                value={applicantData?.hsSchoolName || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                School Address
              </label>
              <Input
                type="text"
                value={applicantData?.hsSchoolAddress || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Year Graduated
              </label>
              <Input
                type="text"
                value={applicantData?.hsYearGraduated || ""}
                readOnly={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* Elementary */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-xl font-semibold">Elementary</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Complete Name of School
              </label>
              <Input
                type="text"
                value={applicantData?.elemSchoolName || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                School Address
              </label>
              <Input
                type="text"
                value={applicantData?.elemSchoolAddress || ""}
                readOnly={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Year Graduated
              </label>
              <Input
                type="text"
                value={applicantData?.elemYearGraduated || ""}
                readOnly={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">
            Program Preferred to Enroll in CIT University
          </h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Program Choice 1
            </label>
            <Input
              type="text"
              value={applicantData?.progChoice1 || ""}
              readOnly={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Program Choice 2
            </label>
            <Input
              type="text"
              value={applicantData?.progChoice2 || ""}
              readOnly={true}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Program Choice 3
            </label>
            <Input
              type="text"
              value={applicantData?.progChoice3 || ""}
              readOnly={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
