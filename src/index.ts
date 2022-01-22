import { defineDisplay } from "@directus/extensions-sdk";
import DisplayComponent from "./display.vue";

export default defineDisplay({
  id: "extension-display-link",
  name: "Link",
  icon: "open_in_new",
  description: "Display URLs with an open in new tab icon link",
  component: DisplayComponent,
  options: null,
  types: ["string"],
});
