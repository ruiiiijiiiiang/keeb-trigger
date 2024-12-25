import "./app.css";
import { mount } from "svelte";
import App from "./App.svelte";
import { storePopup } from "@skeletonlabs/skeleton";
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";

storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
