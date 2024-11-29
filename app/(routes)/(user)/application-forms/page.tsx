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

import { ApplicationFormsView } from "./ApplicationFormsView";
import { IsApplicationSubmitted } from "./IsApplicationSubmitted";

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
            <BreadcrumbPage>Application Forms</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {applications ? (
        applications.length > 0 ? (
          <IsApplicationSubmitted isSubmitted={true} />
        ) : (
          <ApplicationFormsView
            applications={applications[0]}
            canEdit={true}
            isSubmitted={false}
          />
        )
      ) : null}
    </ContentLayout>
  );
}
