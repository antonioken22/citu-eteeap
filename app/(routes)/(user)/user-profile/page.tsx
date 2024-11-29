"use client";

import Link from "next/link";

import { ContentLayout } from "@/app/_components/(content-layout)/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useUser } from "@clerk/nextjs";
import { useApplications } from "@/hooks/use-applications";

import { UserProfileView } from "./UserProfileView";
import { ApplicantData } from "@/types/ApplicantData";

export default function UserProfilePage() {
  const { user } = useUser();
  const { applications } = useApplications();

  // Filter to get the application that matches user.id
  const userApplication: ApplicantData | undefined = applications.find(
    (application) => application.applicantId === user?.id
  );

  return (
    <ContentLayout title="User Profile">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>User Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <UserProfileView />
    </ContentLayout>
  );
}
