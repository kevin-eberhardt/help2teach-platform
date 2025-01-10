import { AppSidebar } from "@/components/app-sidebar";
import LocaleSwitcher from "@/components/locale-switcher";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSchoolClassesWithSchool, getUser } from "@/lib/supabase/queries";
import { notFound, redirect } from "next/navigation";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string; class_id: string };
}) {
  const user = await getUser();
  const schoolClasses = await getSchoolClassesWithSchool();
  const { class_id } = await params;
  const currentSchoolClass = schoolClasses?.find(
    (schoolClass) => schoolClass.id === parseInt(class_id)
  );
  if (!currentSchoolClass) {
    if (schoolClasses && schoolClasses.length > 0) {
      return notFound();
    }
    return redirect("/app/new");
  }
  return (
    <SidebarProvider>
      <AppSidebar
        user={user}
        schoolClasses={schoolClasses}
        currentSchoolClass={currentSchoolClass}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="pr-4">
            <LocaleSwitcher />
          </div>
        </header>
        <div className="container">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
