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
  const [selectedZoom, setSelectedZoom] = useState(zoom);

  useEffect(() => {
    setSelectedZoom(zoom);
  }, [zoom]);

  const increaseZoom = () => {
    const currentIndex = zoomLevels.findIndex(
      (level) => level >= selectedZoom.k
    );
    if (currentIndex < zoomLevels.length - 1) {
      const newZoom = zoom
        .translate(zoom.x, zoom.y)
        .scale(zoomLevels[currentIndex + 1]);
      setZoom(newZoom);
    }
  };

  const decreaseZoom = () => {
    const currentIndex = zoomLevels.findIndex(
      (level) => level >= selectedZoom.k
    );
    if (currentIndex > 0) {
      const newZoom = zoom
        .translate(zoom.x, zoom.y)
        .scale(zoomLevels[currentIndex - 1]);
      setZoom(newZoom);
    }
  };
  const roundedZoom = Math.round(selectedZoom.k * 100);

  return (
    <div className="flex justify-center items-center bg-white border border-accent">
      <Button size="icon" variant="ghost" onClick={increaseZoom}>
        <Plus />
      </Button>
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger>{roundedZoom}%</MenubarTrigger>
          <MenubarContent className="min-w-16 w-16">
            {zoomLevels.map((level) => (
              <MenubarItem
                key={level}
                onClick={() => {
                  const newZoom = zoom.translate(zoom.x, zoom.y).scale(level);
                  setSelectedZoom(newZoom);
                }}
              >
                {level * 100}%
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <Button size="icon" variant="ghost" onClick={decreaseZoom}>
        <Minus />
      </Button>
    </div>
  );
}
