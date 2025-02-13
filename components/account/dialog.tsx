"use client";

import * as React from "react";
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

const data = {
  nav: [
    { name: "Account", icon: UserIcon, id: "change-user" },
    { name: "Password Change", icon: Lock, id: "change-password" },
    { name: "E-Mail Change", icon: Mail, id: "change-email" },
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
  user: User;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[900px]">
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
                          isActive={item.name === "Account"}
                        >
                          <a href="#">
                            <item.icon />
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 pt-4">
              <h2 className="text-2xl font-bold">Account</h2>
              <div id="change-user">
                <UserForm user={user} />
              </div>
              <div id="change-password">
                <PasswordChange email={user.email} />
              </div>
              <div id="change-email">
                <EmailChangeForm email={user.email} />
              </div>
              <div id="delete-account">Delete account</div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
