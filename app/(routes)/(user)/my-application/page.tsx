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

import { useApplications } from "@/hooks/use-applications";

import { ApplicationFormsView } from "../application-forms/ApplicationFormsView";
import { IsApplicationSubmitted } from "../application-forms/IsApplicationSubmitted";
import { app } from "@/firebase/config";

export default function ApplicationFormsPage() {
  const { applications } = useApplications();

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
            <BreadcrumbPage>My Application</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {applications.length > 0 ? (
        <ApplicationFormsView
          applications={applications[0]}
          canEdit={applications[0].canEdit as boolean}
          isSubmitted={applications[0].isSubmitted as boolean}
        />
      ) : (
        <IsApplicationSubmitted isSubmitted={false} />
      )}
    </ContentLayout>
  );
}
