<template>
  <div>
    <a :href="href" target="_blank" @click.stop>
      <v-icon class="extension-display-link__icon" name="open_in_new" left />
    </a>
    <template v-if="!hideValue">{{url}}</template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  props: {
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
    hideValue: {
      type: Boolean,
      default: false
    },
  },
  setup(props) {
    const href = `${props.prefix || ''}${props.value}${props.suffix || ''}`
    const prefix = props.showPrefix ? props.prefix : ''
    const suffix = props.showSuffix ? props.suffix : ''
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
