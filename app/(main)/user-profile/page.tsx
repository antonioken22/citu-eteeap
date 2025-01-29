"use client";

import { useEffect } from "react";
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
import { useApplications } from "@/hooks/firebase-firestore/useApplications";

import { UserProfileView } from "./UserProfileView";

export default function UserProfilePage() {
  const { user, isLoaded } = useUser();
  const {
    userApplications,
    fetchUserApplications,
    loading: useApplicationsLoading,
  } = useApplications();

  // Fetch user applications when component mounts
  useEffect(() => {
    if (isLoaded && user) {
      fetchUserApplications();
    }
  }, [isLoaded, user, fetchUserApplications]);

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
      <UserProfileView applicantData={userApplications[0]} />
    </ContentLayout>
  );
}
