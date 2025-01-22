"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/lib/i18n/routing";
import { SchoolClass } from "@/lib/supabase/types/additional.types";
import { NavItem } from "@/lib/types/layout";
import { Combine, Workflow } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSelectedLayoutSegments } from "next/navigation";

function getToolNavItems(
  t?: (key: string) => string,
  currentSchoolClassId?: number
): NavItem[] {
  return [
    {
      title: t ? t("seating-plans") : "Seating Plans",
      url: `/app/${currentSchoolClassId}/seating-plans`,
      icon: Combine,
    },
    {
      title: t ? t("sociograms") : "Sociograms",
      url: `/app/${currentSchoolClassId}/sociograms`,
      icon: Workflow,
      disabled: true,
      badge: <span>coming soon</span>,
    },
  ];
}

export default function ToolsNav({
  currentSchoolClass,
}: {
  currentSchoolClass: SchoolClass | null;
}) {
  const t = useTranslations("sidebar");
  const segments = useSelectedLayoutSegments();

  const items = getToolNavItems(t, currentSchoolClass?.id);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("tools")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.url.includes(segments[0])}
                disabled={item.disabled}
                aria-disabled={item.disabled}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.badge && (
                <SidebarMenuBadge aria-disabled={item.disabled}>
                  {item.badge}
                </SidebarMenuBadge>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
