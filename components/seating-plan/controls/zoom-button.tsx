import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ZoomTransform } from "d3-zoom";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];
export default function ZoomButton({
  zoom,
  setZoom,
}: {
  zoom: ZoomTransform;
  setZoom: (zoom: ZoomTransform) => void;
}) {
  useEffect(() => {
    setSelectedZoom(zoom);
  }, [zoom]);

  const [selectedZoom, setSelectedZoom] = useState(zoom);
  return (
    <div className="flex justify-center items-center bg-white border border-accent">
      <Button size="icon" variant="ghost">
        <Plus />
      </Button>
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger>{selectedZoom.k * 100}%</MenubarTrigger>
          <MenubarContent className="min-w-16 w-16">
            {zoomLevels.map((level) => (
              <MenubarItem
                key={level}
                onClick={() => {
                  const newZoom = zoom.translate(zoom.x, zoom.y).scale(level);
                  setSelectedZoom(newZoom);
                  setZoom(newZoom);
                }}
              >
                {level * 100}%
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Button size="icon" variant="ghost">
        <Minus />
      </Button>
    </div>
  );
}
