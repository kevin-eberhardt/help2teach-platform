import { useOnViewportChange, Viewport } from "@xyflow/react";
import { useCallback } from "react";

export function ViewportLogger({
  setViewPort,
}: {
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
