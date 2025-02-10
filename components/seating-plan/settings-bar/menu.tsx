import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ImageDown, Loader2, MoreHorizontal, Save } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { SeatingPlanNode } from "@/lib/types/seating-plan";
import { saveSeatingPlan } from "./actions";
import { SeatingPlan } from "@/lib/supabase/types/additional.types";
import { useRouter } from "next/navigation";
import {
  Panel,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react";
import { toPng } from "html-to-image";

export function Menu({ seatingPlan }: { seatingPlan: SeatingPlan }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-56 overflow-hidden rounded-lg p-0"
        align="center"
      >
        <Sidebar collapsible="none" className="bg-transparent">
          <SidebarContent>
            <SidebarGroup key={"general"} className="border-b last:border-none">
              <SidebarGroupContent className="gap-0">
                <SidebarMenu>
                  <SaveMenuItem seatingPlan={seatingPlan} setOpen={setIsOpen} />
                  <ExportMenuItem />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </PopoverContent>
    </Popover>
  );
}

function SaveMenuItem({
  seatingPlan,
  setOpen,
}: {
  seatingPlan: SeatingPlan;
  setOpen: (open: boolean) => void;
}) {
  const t = useTranslations("seating-plan");
  const [isPending, startTransition] = useTransition();
  const { toObject } = useReactFlow();
  const router = useRouter();

  function handleClick() {
    startTransition(async () => {
      const nodes = toObject().nodes as SeatingPlanNode[];
      await saveSeatingPlan(seatingPlan, nodes);
      setOpen(false);
      router.refresh();
    });
  }
  return (
    <SidebarMenuItem key={"save"}>
      <SidebarMenuButton onClick={handleClick} disabled={isPending}>
        {isPending ? <Loader2 className="animate-soin" /> : <Save />}{" "}
        <span>{t("settings.save-button")}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function exportImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "help2teach.png");
  a.setAttribute("href", dataUrl);
  a.click();
}
const imageWidth = 1920;
const imageHeight = 1080;

function ExportMenuItem() {
  const t = useTranslations("seating-plan");

  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2,
      0
    );

    const element = document.querySelector(".react-flow__viewport");
    if (!element) return;

    toPng(element as HTMLElement, {
      backgroundColor: "rgba(255,255,255,0)",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth.toString(),
        height: imageHeight.toString(),
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(exportImage);
  };
  return (
    <SidebarMenuItem key={"export"}>
      <SidebarMenuButton onClick={onClick}>
        <ImageDown />
        <span>{t("settings.export-button")}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
