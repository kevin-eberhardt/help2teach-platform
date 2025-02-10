"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { Copy, Loader, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import DeleteDialog from "../dialogs/delete-dialog";
import RenameDialog from "../dialogs/rename-dialog";
import { useTranslations } from "next-intl";
import { duplicateSeatingPlan } from "../dialogs/actions";
import { useRouter } from "@/lib/i18n/routing";

export default function OptionsMenu({
  seatingPlanId,
  seatingPlanName,
}: {
  seatingPlanId: SeatingPlan["id"];
  seatingPlanName: SeatingPlan["name"];
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("general");

  function handleDuplicateClick() {
    startTransition(async () => {
      const error = await duplicateSeatingPlan(
        seatingPlanId,
        t ? t("copy") : "Copy"
      );
      if (error) {
        console.error(error);
        return;
        // TODO: Show error toast
      }
      router.refresh();
    });
  }
  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal />
            <span className="sr-only">{t("open-menu")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onSelect={() => {
              setDropdownOpen(false);
              setIsRenameDialogOpen(true);
            }}
          >
            <Pencil />
            {t("rename")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicateClick} disabled={isPending}>
            {isPending ? <Loader className="animate-spin" /> : <Copy />}
            {t("duplicate")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setDropdownOpen(false);
              setIsDeleteDialogOpen(true);
            }}
          >
            <Trash />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        onOpenChange={setIsDeleteDialogOpen}
        open={isDeleteDialogOpen}
        seatingPlanId={seatingPlanId}
      />
      <RenameDialog
        onOpenChange={setIsRenameDialogOpen}
        open={isRenameDialogOpen}
        seatingPlanId={seatingPlanId}
        seatingPlanName={seatingPlanName}
      />
    </>
  );
}
