<template>
  <div>
    <a :href="href" target="_blank" @click.stop>
      <v-icon class="extension-display-link__icon" :name="icon" left />
    </a>
    <template v-if="!hideValue">{{url}}</template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

const kinds = {
  url: '',
  email: 'mailto:',
  tel: 'tel:'
}

export default defineComponent({
  props: {
    kind: {
      type: String,
      default: 'url'
    },
    hideValue: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'open_in_new',
    },
    value: {
      type: String,
      default: null,
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
    const url = `${props.prefix || ''}${props.value}${props.suffix || ''}`
    const prefix = props.showPrefix ? props.prefix : ''
    const suffix = props.showSuffix ? props.suffix : ''
    const kind = kinds[props.kind]
    const href = `${kind}${url}`
    return {
      href,
      url: `${prefix}${props.value}${suffix}`
    }
  }
});
</script>

<style>
.extension-display-link__icon:hover {
  --v-icon-color: var(--primary);
}
</style>
