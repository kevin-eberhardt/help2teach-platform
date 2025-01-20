"use client";

import * as React from "react";
import { ChevronsUpDown, Plus, School } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SchoolClass } from "@/lib/supabase/types/additional.types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import CreateSchoolClassDialog from "../ui/school-classes/create-dialog";

export function SchoolClassSwitcher({
  currentSchoolClass,
  schoolClasses,
}: {
  currentSchoolClass: SchoolClass;
  schoolClasses: SchoolClass[] | null;
}) {
  const { isMobile } = useSidebar();
  const activeSchoolClass = currentSchoolClass;

  const t = useTranslations("sidebar");
  const router = useRouter();

  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);

  function handleClick(schoolClassId: number) {
    router.push(`/app/${schoolClassId}`);
  }
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
                <School className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeSchoolClass.name}
                </span>
                {/* <span className="truncate text-xs">{activeschoolClass.plan}</span> */}
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
            {schoolClasses &&
              schoolClasses
                .filter((s) => s.id !== currentSchoolClass.id)
                .map((schoolClass) => (
                  <DropdownMenuItem
                    key={schoolClass.name}
                    onClick={() => handleClick(schoolClass.id)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <School className="size-4 shrink-0" />
                    </div>
                    {schoolClass.name}
                  </DropdownMenuItem>
                ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => setCreateDialogOpen(true)}
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
        open={createDialogOpen}
        openChange={setCreateDialogOpen}
      />
    </SidebarMenu>
  );
}
