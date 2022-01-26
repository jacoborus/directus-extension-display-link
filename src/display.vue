<template>
  <value-null v-if="value === null" />
  <template v-else>
    <v-hover v-slot="{hover}" class="ext-display-link">
      <div class="ext-display-link__wrapper">
        <a :href="href" target="_blank" @click.stop>
          <v-icon
            v-if="showLinkButton"
            v-tooltip="`${verb} ${url}`"
            class="ext-display-link__icon"
            :name="icon"
            left
          />
        </a>

        <span v-if="showUrl" :class="[font]" class="ext-display-link__url">{{url}}</span>

        <transition name="fade">
          <v-icon
            v-if="showClipboard && (!showUrl || hover)"
            v-tooltip="`Copy to clipboard \n ${href}`"
            class="ext-display-link__clip"
            right
            name="content_copy"
            @click.stop="copyToClipboard"
          />
        </transition>
      </div>
    </v-hover>
  </template>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useStores} from "@directus/extensions-sdk";

const protocols = {
  url: "",
  email: "mailto:",
  tel: "tel:",
};

const verbs = {
  url: "Open",
  email: "Send email to",
  tel: "Call",
};

export default defineComponent({
  props: {
    value: {
      type: String,
      default: null,
    },
    kind: {
      type: String,
      default: "url",
    },
    showLinkButton: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      default: "open_in_new",
    },
    showUrl: {
      type: Boolean,
      default: true,
    },
    font: {
      type: String,
      default: "sans-serif",
      validator: (value: string) =>
        ["sans-serif", "serif", "monospace"].includes(value),
    },
    showClipboard: {
      type: Boolean,
      default: true,
    },
    prefix: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    showPrefix: {
      type: Boolean,
      default: false,
    },
    showSuffix: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const {useNotificationsStore} = useStores();
    const notifStore = useNotificationsStore();

    const prefix = props.showPrefix ? props.prefix : "";
    const suffix = props.showSuffix ? props.suffix : "";
    const url = `${prefix}${props.value}${suffix}`;
    const protocol = protocols[props.kind];
    const href = `${protocol}${url}`;
    const verb = verbs[props.kind];

    return {
      verb,
      href,
      url,
      copyToClipboard,
    };

    async function copyToClipboard() {
      try {
        await navigator?.clipboard?.writeText(href);
        notifStore.add({
          title: "Copied!",
          type: "success",
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          notifStore.add({
            title: "Error!",
            type: "error",
            error: err,
          });
        }
      }
    }
  },
});
</script>

<style>
.ext-display-link {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
}
.ext-display-link__wrapper {
  display: flex;
  line-height: 18px;
}
.ext-display-link__url {
  flex-shrink: 1;
  overflow: hidden;
}
.ext-display-link__url.sans-serif {
  font-family: var(--family-sans-serif);
}
.ext-display-link__url.serif {
  font-family: var(--family-serif);
}
.ext-display-link__url.monospace {
  font-family: var(--family-monospace);
}
.ext-display-link__icon,
.ext-display-link__clip {
  --v-icon-size: 18px;
}
.ext-display-link__icon:hover,
.ext-display-link__clip:hover {
  --v-icon-color: var(--primary);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
