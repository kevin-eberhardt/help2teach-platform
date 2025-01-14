import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { getSchoolClasses, getUser } from "@/lib/supabase/queries";
import ToolsNav from "./tools-nav";
import { SchoolClass } from "@/lib/supabase/types/additional.types";
import { SchoolClassSwitcher } from "./school-class-switcher";

export async function AppSidebar({
  currentSchoolClass,
}: {
  currentSchoolClass: SchoolClass | null;
}) {
  const user = await getUser();
  const schoolClasses = await getSchoolClasses();

  return (
    <Sidebar user={user} collapsible="icon">
      <SidebarHeader>
        {currentSchoolClass && (
          <SchoolClassSwitcher
            currentSchoolClass={currentSchoolClass}
            schoolClasses={schoolClasses}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <ToolsNav currentSchoolClass={currentSchoolClass} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
