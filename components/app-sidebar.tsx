"use client";

import * as React from "react";
import { Combine, Settings, Users, Workflow } from "lucide-react";

import { SidebarSettingsNavigation } from "@/components/sidebar-settings-nav";
import { SidebarToolsNavigation } from "@/components/sidebar-tools-nav";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { SchoolClassSwitcher } from "./team-switcher";
import { SchoolClassWithSchool } from "@/lib/supabase/types/additional.types";

export function getToolsNavItems(t?: (key: string) => string) {
  return [
    {
      title: t ? t("seating-plans") : "Seating Plans",
      url: "/seating-plans",
      icon: Combine,
      isActive: true,
    },
    {
      title: t ? t("sociograms") : "Sociograms",
      url: "/sociograms",
      icon: Workflow,
      isActive: false,
      isDisabled: true,
    },
  ];
}

export function getSettingsNavItems(t?: (key: string) => string) {
  return [
    {
      title: t ? t("school-class") : "Class",
      url: "/classes",
      icon: Users,
      isActive: true,
      items: [
        {
          title: t ? t("students") : "Students",
          url: "/",
          icon: Users,
        },
      ],
    },
    {
      title: t ? t("settings") : "Settings",
      url: "/settings",
      icon: Settings,
      items: [],
    },
  ];
}
export function AppSidebar({
  schoolClasses,
  currentSchoolClass,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  currentSchoolClass?: SchoolClassWithSchool;
  schoolClasses?: SchoolClassWithSchool[] | null;
}) {
  const t = useTranslations("sidebar");
  const toolsNavItems = getToolsNavItems(t);
  const settingsNavItems = getSettingsNavItems(t);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SchoolClassSwitcher
          schoolClasses={schoolClasses ? schoolClasses : []}
          currentSchoolClass={currentSchoolClass}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarToolsNavigation items={toolsNavItems} />
        <SidebarSettingsNavigation items={settingsNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
