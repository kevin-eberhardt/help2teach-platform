import { Link, usePathname } from "@/lib/i18n/routing";
import {
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbItem as ShadCnBreadcrumbItem,
} from "../ui/breadcrumb";
import { SidebarBreadcrumbItem } from "@/lib/types";
import { useTranslations } from "next-intl";
import { validateUUID } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { getSeatingPlanById } from "@/lib/supabase/queries";
import { Skeleton } from "../ui/skeleton";

function translateTitle(t: (key: string) => string, path: string) {
  if (path === "seating-plans") {
    return t("seating-plans");
  }
  if (path === "sociograms") {
    return t("sociograms");
  }

  if (path === "settings") {
    return t("settings");
  }

  if (path === "students") {
    return t("students");
  }
  return t("overview");
}
export default function BreadcrumbItem({
  path,
  isLast,
  title = "",
  ...props
}: React.ComponentProps<typeof ShadCnBreadcrumbItem> & SidebarBreadcrumbItem) {
  const t = useTranslations("sidebar");
  const [clearTitle, setClearTitle] = useState<string>(
    title !== "" ? title : ""
  );
  const pathname = usePathname();

  const fullPath = path
    ? pathname.slice(0, pathname.indexOf(path) + path.length)
    : pathname;

  useEffect(() => {
    async function getTitle() {
      if (title === "" && path) {
        if (validateUUID(path)) {
          if (pathname.includes("seating-plans")) {
            console.debug("Getting seating plan by id");
            const seatingPlan = await getSeatingPlanById(path);
            setClearTitle(seatingPlan?.name || "");
          }
        } else {
          setClearTitle(translateTitle(t, path));
        }
      }
    }
    getTitle();
  }, []);

  if (!clearTitle) {
    return (
      <ShadCnBreadcrumbItem key={"skeleton"}>
        <Skeleton className="w-20 h-6" />
      </ShadCnBreadcrumbItem>
    );
  }

  if (!isLast) {
    return (
      <ShadCnBreadcrumbItem key={"school-class"}>
        <BreadcrumbLink asChild>
          {path ? (
            <Link href={fullPath}>{clearTitle}</Link>
          ) : (
            <p>{clearTitle}</p>
          )}
        </BreadcrumbLink>
      </ShadCnBreadcrumbItem>
    );
  } else {
    return (
      <ShadCnBreadcrumbItem {...props}>
        <BreadcrumbPage>{clearTitle}</BreadcrumbPage>
      </ShadCnBreadcrumbItem>
    );
  }
}
