"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { User } from "@/lib/supabase/types/additional.types";
import UserForm from "./user-form";
import { Lock, Mail, Trash, User as UserIcon } from "lucide-react";
import PasswordChange from "./password-change";
import EmailChangeForm from "./email-form";
import DeleteAccount from "./delete-account";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";

const data = {
  nav: [
    { name: "Profile", icon: UserIcon, id: "user-form" },
    { name: "Password Change", icon: Lock, id: "password-change" },
    { name: "E-Mail Change", icon: Mail, id: "email-form" },
    { name: "Delete account", icon: Trash, id: "delete-account" },
  ],
};

export function AccountDialog({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
}) {
  const [activeSection, setActiveSection] = useState<string>("user-form");
  const isMobile = useIsMobile();
  const t = useTranslations("");

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 max-w-full md:max-h-[500px] md:max-w-[700px] lg:max-w-[900px]">
        <DialogTitle className="sr-only">Account</DialogTitle>
        <DialogDescription className="sr-only">
          Change your account settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={activeSection === item.id}
                          onClick={() => setActiveSection(item.id)}
                        >
                          <button>
                            <item.icon />
                            <span>{t(`${item.id}.heading`)}</span>
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-auto md:h-[480px] flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 flex-col gap-6 p-4 pt-4">
              <h2 className="text-2xl font-bold">Account</h2>
              {/* Desktop View: Conditional Rendering */}
              {!isMobile && (
                <>
                  {activeSection === "user-form" && (
                    <div id="user-form">
                      <UserForm user={user} />
                    </div>
                  )}
                  {activeSection === "password-change" && (
                    <div id="password-change">
                      <PasswordChange email={user.email ?? ""} />
                    </div>
                  )}
                  {activeSection === "email-form" && (
                    <div id="email-form">
                      <EmailChangeForm email={user.email ?? ""} />
                    </div>
                  )}
                  {activeSection === "delete-account" && (
                    <div id="delete-account">
                      <DeleteAccount userId={user.id} />
                    </div>
                  )}
                </>
              )}
              {/* Mobile View: Show All */}
              {isMobile && (
                <>
                  <div id="user-form">
                    <UserForm user={user} />
                  </div>
                  <div id="password-change">
                    <PasswordChange email={user.email ?? ""} />
                  </div>
                  <div id="email-form">
                    <EmailChangeForm email={user.email ?? ""} />
                  </div>
                  <div id="delete-account">
                    <DeleteAccount userId={user.id} />
                  </div>
                </>
              )}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
