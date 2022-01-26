import { defineDisplay } from "@directus/extensions-sdk";
import DisplayComponent from "./display.vue";

export default defineDisplay({
  id: "extension-display-link",
  name: "Link",
  icon: "open_in_new",
  description: "Display URLs with an open in new tab icon link",
  component: DisplayComponent,
  options: [
    {
      field: "kind",
      name: "Type",
      meta: {
        width: "full",
        interface: "select-dropdown",
        options: {
          choices: [
            {
              text: "URL",
              value: "url",
            },
            {
              text: "Telephone",
              value: "tel",
            },
            {
              text: "Email",
              value: "email",
            },
          ],
        },
      },
      schema: {
        default_value: "url",
      },
    },
    {
      field: "hideValue",
      name: "Hide URL",
      type: "boolean",
      meta: {
        interface: "boolean",
        width: "half",
        options: {
          label: "Just display the icon",
        },
      },
      schema: {
        default_value: false,
      },
    },
    {
      field: "icon",
      name: "$t:displays.formatted-value.icon",
      type: "string",
      meta: {
        width: "half",
        interface: "select-icon",
      },
      schema: {
        default_value: "open_in_new",
      },
    },
    {
      field: "showPrefix",
      name: "Show prefix",
      type: "boolean",
      meta: {
        interface: "boolean",
        width: "half",
        options: {
          label: "Display prefix in view",
        },
      },
      schema: {
        default_value: false,
      },
    },
    {
      field: "showSuffix",
      name: "Show suffix",
      type: "boolean",
      meta: {
        interface: "boolean",
        width: "half",
        options: {
          label: "Display suffix in view",
        },
      },
      schema: {
        default_value: false,
      },
    },
    {
      field: "prefix",
      name: "$t:displays.formatted-value.prefix",
      type: "string",
      meta: {
        width: "half",
        interface: "input",
        options: {
          label: "$t:displays.formatted-value.prefix_label",
          placeholder: "https://",
          trim: true,
        },
      },
      schema: {
        default_value: "",
      },
    },
    {
      field: "suffix",
      name: "$t:displays.formatted-value.suffix",
      type: "string",
      meta: {
        width: "half",
        interface: "input",
        options: {
          label: "$t:displays.formatted-value.suffix_label",
          trim: true,
        },
      },
      schema: {
        default_value: "",
      },
    },
  ],
  types: ["string", "text"],
});
