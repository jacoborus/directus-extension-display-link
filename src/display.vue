<template>
  <v-hover class="ext-display-link" v-slot="{hover}">
    <a :href="href" target="_blank" @click.stop>
      <v-icon
        v-if="showLinkButton"
        class="ext-display-link__icon"
        v-tooltip="`Open ${href}`"
        :name="icon"
        left
      />
    </a>

    <span class="ext-display-link__url" v-if="showUrl">{{url}}</span>

    <transition name="fade">
      <v-icon
        v-if="showClipboard && (!showUrl || hover)"
        class="ext-display-link__clip"
        v-tooltip="'Copy to clipboard'"
        @click.stop="copyToClipboard"
        right
        name="content_copy"
      />
    </transition>
  </v-hover>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useStores} from '@directus/extensions-sdk';

const kinds = {
  url: '',
  email: 'mailto:',
  tel: 'tel:'
}

export default defineComponent({
  props: {
    value: {
      type: String,
      default: null,
    },
    kind: {
      type: String,
      default: 'url'
    },
    showLinkButton: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: 'open_in_new',
    },
    showUrl: {
      type: Boolean,
      default: true
    },
    showClipboard: {
      type: Boolean,
      default: true
    },
    showPrefix: {
      type: Boolean,
      default: false
    },
    showSuffix: {
      type: Boolean,
      default: false
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const {useNotificationsStore} = useStores();
    const notifStore = useNotificationsStore();
    const url = `${props.prefix || ''}${props.value}${props.suffix || ''}`
    const prefix = props.showPrefix ? props.prefix : ''
    const suffix = props.showSuffix ? props.suffix : ''
    const kind = kinds[props.kind]
    const href = `${kind}${url}`

    return {
      href,
      url: `${prefix}${props.value}${suffix}`,
      copyToClipboard
    }

    async function copyToClipboard() {
      try {
        await navigator?.clipboard?.writeText(href);
        notifStore.add({
          title: 'Copied!',
          type: 'success',
        })
      } catch (err: any) {
        notifStore.add({
          title: 'Error!',
          type: 'error',
        })
      }
    }
  }
});
</script>

<style>
.ext-display-link {
  display: flex;
  max-width: 100%;
  overflow: hidden;
  line-height: 18px;
}
.ext-display-link__url {
  flex-shrink: 1;
  overflow: hidden;
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
