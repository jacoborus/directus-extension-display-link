<template>
  <div>
    <a :href="value" target="_blank" @click.stop>
      <v-icon name="open_in_new" left />
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
