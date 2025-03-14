import { AppSidebar } from "@/components/app-sidebar";
import SidebarBreadcrumbs from "@/components/app-sidebar/breadcrumbs";
import LocaleSwitcher from "@/components/locale-switcher";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getSchoolClassById } from "@/lib/supabase/queries";
import { Metadata } from "next";
import { Params } from "next/dist/server/request/params";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { class_id } = await params;
  if (!class_id) {
    return notFound();
  }
  const currentSchoolClass = await getSchoolClassById(class_id as string);
  if (!currentSchoolClass || !currentSchoolClass.name) {
    return notFound();
  }

  return {
    title: {
      default: currentSchoolClass.name,
      template: `%s | ${currentSchoolClass.name} | ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
    },
  };
}

export default async function ClassLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; class_id: string }>;
}) {
  const { class_id } = await params;
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  const currentSchoolClass = await getSchoolClassById(class_id);

  if (!currentSchoolClass) {
    return notFound();
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar currentSchoolClass={currentSchoolClass} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-gray-200">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <SidebarBreadcrumbs currentSchoolClass={currentSchoolClass} />
          </div>
          <div className="hidden md:block px-4">
            <LocaleSwitcher />
          </div>
        </header>
        {children}
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
