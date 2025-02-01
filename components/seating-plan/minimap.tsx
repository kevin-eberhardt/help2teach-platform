import { SeatingPlanElementType } from "@/lib/types/seating-plan";
import { ZoomTransform } from "d3-zoom";

interface MinimapProps {
  elements: SeatingPlanElementType[];
  transform: ZoomTransform;
  containerWidth: number;
  containerHeight: number;
}

export default function Minimap({
  elements,
  transform,
  containerWidth,
  containerHeight,
}: MinimapProps) {
  const minimapScale = 0.15; // Skalierung der Minimap
  const minimapWidth = containerWidth * minimapScale;
  const minimapHeight = containerHeight * minimapScale;

  return (
    <div className="fixed bottom-4 right-4 border-2 border-accent bg-background/80 rounded-lg overflow-hidden">
      <div
        style={{
          width: minimapWidth,
          height: minimapHeight,
          position: "relative",
        }}
      >
        {elements.map((element) => {
          // Berechne die transformierte Position für jedes Element
          const transformedX =
            element.coordinates.x * transform.k + transform.x;
          const transformedY =
            element.coordinates.y * transform.k + transform.y;

          return (
            <div
              key={element.id}
              style={{
                position: "absolute",
                left: transformedX * minimapScale,
                top: transformedY * minimapScale,
                width: 8,
                height: 8,
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className="bg-accent"
            />
          );
        })}
        {/* Viewport-Indikator */}
        <div
          style={{
            position: "absolute",
            border: "1px solid var(--accent)",
            left: 0,
            top: 0,
            width: minimapWidth,
            height: minimapHeight,
          }}
        />
      </div>
    </div>
  );
}
