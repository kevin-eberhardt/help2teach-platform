"use client";
import { useState, useCallback } from "react";

const useZoom = () => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const zoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3)); // Max zoom level 3
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1)); // Min zoom level 1
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const pan = useCallback((dx: number, dy: number) => {
    setPosition((prevPosition) => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy,
    }));
  }, []);

  return { zoom, position, zoomIn, zoomOut, resetZoom, pan };
};

export default useZoom;
