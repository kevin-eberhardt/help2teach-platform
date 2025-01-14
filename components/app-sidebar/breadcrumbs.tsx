"use client";
import { Link } from "@/lib/i18n/routing";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSelectedLayoutSegments } from "next/navigation";
import { useTranslations } from "next-intl";
import { SchoolClass } from "@/lib/supabase/types/additional.types";
import React from "react";
import { getSeatingPlanById } from "@/lib/supabase/queries";
import { validateUUID } from "@/lib/utils";

function getSeatingPlanName(id: string) {
  return getSeatingPlanById(id).then((seatingPlan) => {
    return seatingPlan?.name;
  });
}

function getTitle(
  t: (key: string) => string,
  currentSchoolClass: SchoolClass | null,
  path: string,
  segments: string[]
): { title: string; url: string } {
  if (validateUUID(path)) {
    if (segments.includes("seating-plans")) {
      return {
        title: "Sitzplan #123",
        url: `/app/${currentSchoolClass?.id}/seating-plans/${path}`,
      };
    }
  }

  if (path === "seating-plans") {
    return {
      title: t("seating-plans"),
      url: `/app/${currentSchoolClass?.id}/seating-plans`,
    };
  }
  if (path === "sociograms") {
    return {
      title: t("sociograms"),
      url: `/app/${currentSchoolClass?.id}/sociograms`,
    };
  }

  if (path === "settings") {
    return {
      title: t("settings"),
      url: `/app/${currentSchoolClass?.id}/settings`,
    };
  }

  if (path === "students") {
    return {
      title: t("students"),
      url: `/app/${currentSchoolClass?.id}/students`,
    };
  }
  return {
    title: t("overview"),
    url: "/app",
  };
}

export default function SidebarBreadcrumbs({
  currentSchoolClass,
}: {
  currentSchoolClass: SchoolClass | null;
}) {
  const segments = useSelectedLayoutSegments();
  const t = useTranslations("sidebar");

  const titles = segments.map((s) =>
    getTitle(t, currentSchoolClass, s, segments)
  );

  return (
    <Breadcrumb className="px-4">
      <BreadcrumbList>
        <BreadcrumbItem key={"home"}>
          <BreadcrumbLink asChild>
            <Link href="/app">Help2Teach</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {currentSchoolClass && (
          <BreadcrumbItem key={"school-class"}>
            <BreadcrumbLink asChild>
              <Link href={`/app/${currentSchoolClass.id}`}>
                {currentSchoolClass.name}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {titles.map((title, index) => {
          if (index === titles.length - 1) {
            return (
              <React.Fragment key={title.url}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{title.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={title.url}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={title.url}>{title.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
