import "./app.css";
import { mount } from "svelte";
import App from "./App.svelte";
import { storePopup } from "@skeletonlabs/skeleton";
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
