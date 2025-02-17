import Image from "next/image";
import LocaleSwitcher from "./locale-switcher";
import Link from "next/link";
import UserAvatar from "./user-avatar";
import { getUser } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { HeaderNavItem } from "@/lib/types/layout";
import HeaderNavigation from "./header-nav";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("header");
  const navigationItems: HeaderNavItem[] = [
    {
      title: t("home") || "Home",
      href: "/",
      description: t("home") || "Home",
    },
    // {
    // title: "Product",
    // description: "Managing a small business today is already tough.",
    // items: [
    //     {
    //     title: "Reports",
    //     href: "/reports",
    //     },
    //     {
    //     title: "Statistics",
    //     href: "/statistics",
    //     },
    //     {
    //     title: "Dashboards",
    //     href: "/dashboards",
    //     },
    //     {
    //     title: "Recordings",
    //     href: "/recordings",
    //     },
    // ],
    // },
    // {
    // title: "Company",
    // description: "Managing a small business today is already tough.",
    // items: [
    //     {
    //     title: "About us",
    //     href: "/about",
    //     },
    //     {
    //     title: "Fundraising",
    //     href: "/fundraising",
    //     },
    //     {
    //     title: "Investors",
    //     href: "/investors",
    //     },
    //     {
    //     title: "Contact us",
    //     href: "/contact",
    //     },
    // ],
    // },
  ];
  const user = await getUser();

  return (
    <header className="w-full z-40 fixed top-0 left-0 backdrop-blur-md bg-white/80 px-2 shadow-md">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <>
                      <NavigationMenuLink>
                        <Button variant="ghost">{item.title}</Button>
                      </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                              >
                                <span>{subItem.title}</span>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Link className="flex gap-2 items-center lg:justify-center" href="/">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="font-bold text-primary">Help2Teach</span>
        </Link>
        <div className="flex justify-end w-full gap-4">
          {user ? (
            <Link href="/app">
              <Button variant="default" className="hidden md:inline">
                {t("cta-button-logged-in")}
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="hidden md:inline">
                {t("cta-button-logged-out")}
              </Button>
            </Link>
          )}

          <div className="border-r hidden md:inline"></div>
          <div className="hidden md:inline">
            <LocaleSwitcher />
          </div>
          <UserAvatar user={user} />
        </div>
        <HeaderNavigation navigationItems={navigationItems} user={user} />
      </div>
    </header>
  );
}
