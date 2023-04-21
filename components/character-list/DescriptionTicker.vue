<template>
  <p>
    <span v-if="description.style === 'subtitle'" class="text-lg text-yellow-400" v-html="description.text || '&nbsp;'"></span>
    <span v-else v-html="$utilities.processDamageTypeColor(description.text) || '&nbsp;'"></span>
  </p>
</template>

<script lang="ts">
import {PropType} from "vue";
import {GenshinDescription} from "~/src/models/character";

export default {
  name: "DescriptionTicker",
  props: {
    description: {
      type: Object as PropType<GenshinDescription>,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
