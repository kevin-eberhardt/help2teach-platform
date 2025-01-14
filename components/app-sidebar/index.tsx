import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { getUser } from "@/lib/supabase/queries";
import ToolsNav from "./tools-nav";
import { SchoolClass } from "@/lib/supabase/types/additional.types";

export async function AppSidebar({
  currentSchoolClass,
}: {
  currentSchoolClass: SchoolClass | null;
}) {
  const user = await getUser();

  return (
    <Sidebar user={user} collapsible="icon">
      <SidebarHeader className="h-12" />
      <SidebarContent>
        <ToolsNav currentSchoolClass={currentSchoolClass} />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
