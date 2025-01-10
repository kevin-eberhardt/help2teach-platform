"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, Users } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SchoolClassWithSchool } from "@/lib/supabase/types/additional.types";
import { useTranslations } from "next-intl";
import CreateSchoolClassDialog from "./ui/classes/create-dialog";
import { useRouter } from "next/navigation";

export function SchoolClassSwitcher({
  schoolClasses,
  currentSchoolClass,
}: {
  schoolClasses: SchoolClassWithSchool[];
  currentSchoolClass?: SchoolClassWithSchool;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const t = useTranslations("sidebar");
  const [activeSchoolClass, setactiveSchoolClass] = React.useState(
    currentSchoolClass
      ? currentSchoolClass
      : {
          name: t("new-school-class"),
          id: Math.random().toString(),
          created_at: new Date().toISOString(),
          school: null,
        }
  );
  const [openSchoolClassDialog, setOpenSchoolClassDialog] = React.useState(
    schoolClasses.length === 0
  );

  React.useEffect(() => {
    router.push(`/app/${activeSchoolClass.id}`);
  }, [activeSchoolClass, router]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Users className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeSchoolClass.name}
                </span>
                <span className="truncate text-xs">
                  {activeSchoolClass.school?.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {t("school-classes")}
            </DropdownMenuLabel>
            {schoolClasses.map((schoolClass, index) => (
              <DropdownMenuItem
                key={schoolClass.name}
                onClick={() => setactiveSchoolClass(schoolClass)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Users className="size-4 shrink-0" />
                </div>
                {schoolClass.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => setOpenSchoolClassDialog(!openSchoolClassDialog)}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                {t("create-new-school-class")}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <CreateSchoolClassDialog
        open={openSchoolClassDialog}
        openChange={setOpenSchoolClassDialog}
      />
    </SidebarMenu>
  );
}
