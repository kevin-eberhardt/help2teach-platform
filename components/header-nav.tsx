"use client";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n/routing";
import { HeaderNavItem } from "@/lib/types/layout";
import { Menu } from "lucide-react";

import LocaleSwitcher from "./locale-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslations } from "next-intl";
import { User } from "@/lib/supabase/types/additional.types";

export default function HeaderNavigation({
  navigationItems,
  user,
}: {
  navigationItems: HeaderNavItem[];
  user: User | null;
}) {
  const t = useTranslations("header");
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent id="mobile-nav">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          {navigationItems.map((item) => (
            <div key={item.title}>
              <div className="flex flex-col gap-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex justify-between items-center"
                  >
                    <span className="text-lg">{item.title}</span>
                  </Link>
                ) : (
                  <p className="text-lg">{item.title}</p>
                )}
                {item.items &&
                  item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      className="flex justify-between items-center"
                    >
                      <span className="text-muted-foreground">
                        {subItem.title}
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
          {user ? (
            <Link href="/app" className="flex justify-between items-center">
              <span className="text-lg">{t("cta-button-logged-in")}</span>
            </Link>
          ) : (
            <Link href="/login" className="flex justify-between items-center">
              <span className="text-lg">{t("cta-button-logged-out")}</span>
            </Link>
          )}

          <LocaleSwitcher />
        </div>
      </SheetContent>
    </Sheet>
    // <div className="flex w-12 shrink lg:hidden items-end justify-end">
    //   <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
    //     {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
    //   </Button>
    //   {isOpen && (
    //     <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8 px-4">
    //       {navigationItems.map((item) => (
    //         <div key={item.title}>
    //           <div className="flex flex-col gap-2">
    //             {item.href ? (
    //               <Link
    //                 href={item.href}
    //                 className="flex justify-between items-center"
    //               >
    //                 <span className="text-lg">{item.title}</span>
    //               </Link>
    //             ) : (
    //               <p className="text-lg">{item.title}</p>
    //             )}
    //             {item.items &&
    //               item.items.map((subItem) => (
    //                 <Link
    //                   key={subItem.title}
    //                   href={subItem.href}
    //                   className="flex justify-between items-center"
    //                 >
    //                   <span className="text-muted-foreground">
    //                     {subItem.title}
    //                   </span>
    //                 </Link>
    //               ))}
    //           </div>
    //         </div>
    //       ))}
    //       <div className="flex w-full">
    //         <LocaleSwitcher />
    //       </div>
    //     </div>
    //   )}
    // </div>
  );
}
