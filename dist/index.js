// src/index.ts
import { afterAll, vi } from "vitest";
global.jest = vi;
var apis = [
  "Path2D",
  "CanvasGradient",
  "CanvasPattern",
  "CanvasRenderingContext2D",
  "DOMMatrix",
  "ImageData",
  "TextMetrics",
  "ImageBitmap",
  "createImageBitmap"
];
async function importMockWindow() {
  const getCanvasWindow = await import("jest-canvas-mock/lib/window").then((res) => res.default?.default || res.default || res);
  const canvasWindow = getCanvasWindow(window);
  apis.forEach((api) => {
    global[api] = canvasWindow[api];
    global.window[api] = canvasWindow[api];
  });
}
importMockWindow();
afterAll(() => {
  delete global.jest;
  delete global.window.jest;
});
