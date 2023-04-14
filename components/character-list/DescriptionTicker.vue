<template>
  <p>
    <span v-if="description.style === 'subtitle'" class="text-lg text-yellow-400" v-html="description.text || '&nbsp;'"></span>
    <span v-else v-html="$utilities.processDamageTypeColor(description.text) || '&nbsp;'"></span>
  </p>
</template>

<script lang="ts">
import {PropType} from "vue";
import {GenshinDescription} from "~/_nuxt2/src/models/character";

export default {
  name: "DescriptionTicker",
  props: {
    description: Object as PropType<GenshinDescription>
  }
}
</script>

<style scoped>

</style>
