"use client";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, Users } from "lucide-react";
import { SettingsNavItem } from "@/lib/types/layout";
import { SchoolClass } from "@/lib/supabase/types/additional.types";
import { useSelectedLayoutSegments } from "next/navigation";
import { Link } from "@/lib/i18n/routing";

function getSettingsNavItems(
  t?: (key: string) => string,
  currentSchoolClassId?: number
): SettingsNavItem[] {
  return [
    {
      title: t ? t("students") : "Students",
      icon: Users,
      isActive: true,
      url: `/app/${currentSchoolClassId}/students`,
      items: [],
    },
    // {
    //   title: t ? t("school-class") : "School Class",
    //   icon: Users,
    //   isActive: true,
    //   url: `/app/${currentSchoolClassId}`,
    //   items: [
    //     {
    //       title: t ? t("students") : "Students",
    //       url: `/app/${currentSchoolClassId}/students`,
    //       icon: Users,
    //       disabled: false,
    //     },
    //     {
    //       title: "Test",
    //       url: `/app/${currentSchoolClassId}`,
    //       icon: Users,
    //       disabled: true,
    //     },
    //   ],
    // },
  ];
}

export default function SettingsNav({
  currentSchoolClass,
}: {
  currentSchoolClass: SchoolClass | null;
}) {
  const t = useTranslations("sidebar");
  const segments = useSelectedLayoutSegments();
  const items = getSettingsNavItems(t, currentSchoolClass?.id);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("settings")}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.items.length > 0) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={item.items.some(
                        (subItem) =>
                          subItem.url.endsWith(segments[0]) && !subItem.disabled
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.url.endsWith(segments[0])}
                            aria-disabled={subItem.disabled}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          } else {
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={item.url.includes(segments[0])}
                  asChild
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
