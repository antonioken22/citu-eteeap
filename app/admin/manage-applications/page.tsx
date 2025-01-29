"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Table as ReactTable } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ApplicantData } from "@/types/ApplicantData";

import { useUser } from "@clerk/nextjs";
import { useApplications } from "@/hooks/firebase-firestore/useApplications";

import { ContentLayout } from "@/app/_components/(content-layout)/content-layout";
import { columns } from "./components/Columns";
import { ApplicationTableControls } from "./components/ApplicationTableControls";

export default function ManageApplicationsPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const {
    allApplications,
    fetchAllApplications,
    loading: useApplicationsLoading,
  } = useApplications();

  const [selectedApplications, setSelectedApplications] = useState<
    ApplicantData[]
  >([]);
  const [tableInstance, setTableInstance] = useState<
    ReactTable<ApplicantData> | undefined
  >(undefined);

  // Push to /dashboard if not admin
  useEffect(() => {
    if (isLoaded && user?.publicMetadata.role !== "admin") {
      router.push("/");
    }
  }, [isLoaded, user, router]);

  // Fetch all applications when component mounts
  useEffect(() => {
    if (isLoaded && user) {
      fetchAllApplications();
    }
  }, [isLoaded, user, fetchAllApplications]);

  if (!isLoaded) {
    return <></>;
  }

  return (
    <ContentLayout title="Manage Applications">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Admin</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Manage Applications</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DataTable
        columns={columns}
        data={allApplications}
        onDataLoading={useApplicationsLoading}
        defaultPageSize={50}
        defaultSortedColumn={[{ id: "Date Submitted", desc: false }]}
        defaultHiddenColumns={{
          "Application ID": false,

          // SECTION 1: Personal Information
          "Applicant ID": false,
          // "Active Email": false,
          // "Last Name": false,
          // "First Name": false,
          Age: false,
          Gender: false,
          Nationality: false,
          Religion: false,
          Birthdate: false,
          Birthplace: false,
          "Civil Status": false,
          "Birth Rank": false,
          Brothers: false,
          Sisters: false,
          "CIT Siblings": false,
          "Home Address": false,
          "City Address": false,
          "Facebook URL": false,
          "Mobile No.": false,

          // SECTION 2: Parents Profile & Emergency Contact
          "Father's Name": false,
          "Father's Age": false,
          "Father's Birthplace": false,
          "Father's Nationality": false,
          "Father's Religion": false,
          "Father's Education": false,
          "Father's Occupation": false,
          "Mother's Name": false,
          "Mother's Age": false,
          "Mother's Birthplace": false,
          "Mother's Nationality": false,
          "Mother's Religion": false,
          "Mother's Education": false,
          "Mother's Occupation": false,
          "Emergency Contact Name": false,
          "Emergency Contact Relationship": false,
          "Emergency Contact Address": false,
          "Emergency Contact No.": false,

          // SECTION 3: Educational Background
          // "Highest Educational Attainment": false,
          "Prev. Course": false,
          "Last School": false,
          "School Year": false,
          "School Type": false,
          "Prev. School Address": false,
          "HS School Name": false,
          "HS School Address": false,
          "HS Grad. Year": false,
          "Elem School Name": false,
          "Elem School Address": false,
          "Elem Grad. Year": false,
          // "Program Choice 1": false,
          "Program Choice 2": false,
          "Program Choice 3": false,

          // SECTION 4: Requirement Documents
          // "Eval Sheet": false,
          // "Job Desc".: false,
          // "Missing Docs": false,
          // "Employment Cert".: false,
          // "TOR": false,
          // "PSA Birth Cert.": false,
          // "Transfer Cred".: false,
          // "Business Proof": false,
          // "HS Form 137-A": false,
          // "HS Form 138": false,
          // "Marriage Cert.": false,
          "Applicant Type": false,
          // "Photo With Valid ID": false,

          // SECTION 5: Essay Admission Test
          "Exam Set": false,
          "First Question Answer": false,
          "Second Question Answer": false,
          "Third Question Answer": false,
          "Fourth Question Answer": false,
          "Fifth Question Answer": false,
        }}
        onTableReady={(table) => setTableInstance(table)}
        onRowSelectionChange={setSelectedApplications}
      />
      <ApplicationTableControls
        selectedApplications={selectedApplications}
        table={tableInstance}
      />
    </ContentLayout>
  );
}
