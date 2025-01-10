"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import CreateSchoolClassForm from "./form";

export default function CreateSchoolClassDialog({
  open,
  openChange,
}: {
  open: boolean;
  openChange: (open: boolean) => void;
}) {
  const t = useTranslations("school-class");

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("create-dialog.heading")}</DialogTitle>
          <DialogDescription>
            {t("create-dialog.description")}
          </DialogDescription>
        </DialogHeader>
        <CreateSchoolClassForm callback={openChange} />
      </DialogContent>
    </Dialog>
  );
}
