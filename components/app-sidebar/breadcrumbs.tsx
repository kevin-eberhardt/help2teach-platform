"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSelectedLayoutSegments } from "next/navigation";
import { SchoolClass } from "@/lib/supabase/types/additional.types";
import React from "react";
import BreadcrumbItem from "./breadcrumb-item";
import Image from "next/image";

export default function SidebarBreadcrumbs({
  currentSchoolClass,
}: {
  currentSchoolClass: SchoolClass | null;
}) {
  const segments = useSelectedLayoutSegments();

  return (
    <Breadcrumb className="px-4">
      <BreadcrumbList>
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        {currentSchoolClass && (
          <React.Fragment key={"school-class"}>
            <BreadcrumbSeparator />
            <BreadcrumbItem
              key={"school-class"}
              path={`/app/${currentSchoolClass.id}`}
              title={currentSchoolClass.name || ""}
            />
          </React.Fragment>
        )}
        {segments.map((segment, index) => (
          <React.Fragment key={segment}>
            <BreadcrumbSeparator />
            <BreadcrumbItem
              key={segment}
              path={segment}
              isLast={index === segments.length - 1}
            />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
