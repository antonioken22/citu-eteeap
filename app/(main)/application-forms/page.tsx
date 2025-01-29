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

import { ApplicationFormsView } from "./ApplicationFormsView";
import { IsApplicationSubmitted } from "./IsApplicationSubmitted";

export default function ApplicationFormsPage() {
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
    <ContentLayout title="Application Forms">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Application Forms</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {userApplications ? (
        userApplications.length > 0 ? (
          <IsApplicationSubmitted isSubmitted={true} />
        ) : (
          <ApplicationFormsView
            applications={userApplications[0]}
            canEdit={true}
            isSubmitted={false}
          />
        )
      ) : null}
    </ContentLayout>
  );
}
