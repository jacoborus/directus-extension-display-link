<template>
  <div>
    <a :href="value" target="_blank" @click.stop>
      <v-icon class="extension-display-link__icon" name="open_in_new" left />
    </a>
    {{value}}
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
  },
});
</script>

<style>
.extension-display-link__icon:hover {
  --v-icon-color: var(--primary);
}
</style>
