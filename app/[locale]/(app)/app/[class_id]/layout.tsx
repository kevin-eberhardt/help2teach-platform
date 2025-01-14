import { AppSidebar } from "@/components/app-sidebar";
import SidebarBreadcrumbs from "@/components/app-sidebar/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSchoolClassById } from "@/lib/supabase/queries";
import { cookies } from "next/headers";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; class_id: string };
}) {
  const { class_id } = await params;
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const currentSchoolClass = await getSchoolClassById(class_id);
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar currentSchoolClass={currentSchoolClass} />
      <main className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-gray-200">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <SidebarBreadcrumbs currentSchoolClass={currentSchoolClass} />
          </div>
        </header>
        <SidebarInset>{children}</SidebarInset>
      </main>
    </SidebarProvider>
  );
}
