import { useOnViewportChange, Viewport } from "@xyflow/react";
import { useCallback } from "react";

export function ViewportLogger({
  viewPort,
  setViewPort,
}: {
  viewPort: Viewport | null;
  setViewPort: (viewPort: Viewport) => void;
}) {
  const handleViewportChange = useCallback(
    (viewport: Viewport) => setViewPort(viewport),
    [setViewPort]
  );

  useOnViewportChange({
    onStart: handleViewportChange,
    onChange: handleViewportChange,
    onEnd: handleViewportChange,
  });

  return null;
}
