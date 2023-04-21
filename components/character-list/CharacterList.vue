<template>

  <article
    class="border rounded-lg overflow-hidden"
    :class="{'expand': expand && !isExpanding,}"
    ref="infoBox">

    <CharacterListHeader :char-data="props.charData" :expand-mode="expand || isExpanding" @list:toggleExpand="toggleExpand" />
    <Transition name="desc">
      <div v-if="expand" class="mt-6 flex flex-col gap-8 relative">
        <div class="p-4">
          <div class="flex flex-row gap-4">
            <div class="flex flex-1 flex-col gap-2" v-for="(talent, idx) in charData.talents">
              <div class="flex flex-row gap-4">
                <nuxt-img class="inline w-[96px] h-[96px]" :src="talent.icon" loading="lazy" />
                <span class="flex flex-col gap-1 flex-1 justify-center">
              <p class="text-2xl">{{talent.name}}</p>
              <p class="text-lg text-gray-300">{{$utilities.getTalentTypeStr(talent.type)}}</p>
              <p>-</p>
            </span>
              </div>
              <div class="flex flex-col">
                <DescriptionTicker v-for="(desc,idx) in (descMode ? talent.description : talent.originalDescription)" :key="`talent-desc-${idx}`" :description="desc" />
              </div>
              <div class="flex flex-col mt-4 gap-3">
                <button @click="expandImages[idx] = !expandImages[idx]" v-if="talent.images.length !== 0">Preview</button>
                <nuxt-img :key="imgs" v-for="imgs in talent.images" :src="imgs" class="rounded-lg transition-full" v-if="expandImages[idx]" loading="lazy" />
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-4" v-for="psv in charData.passives">
              <nuxt-img class="inline w-[64px] h-[64px]" :src="psv.icon" :alt="'Icon of ' + psv.name" loading="lazy" />
              <div class="flex flex-col">
                <h2 class="text-2xl items-center">{{psv.name}} • <span class="text-lg text-gray-400">{{$utilities.getPassiveTypeStr(psv.type)}}</span></h2>
                <DescriptionTicker v-for="(desc, idx) in (descMode ? psv.description : psv.originalDescription)" :key="`psv-desc-${idx}`" :description="desc" />
              </div>
            </div>
            <div class="flex flex-row gap-4" v-for="cons in charData.constellations">
              <nuxt-img class="inline w-[64px] h-[64px]" :src="cons.icon" loading="lazy" />
              <div class="flex flex-col">
                <h2 class="text-2xl items-center">{{cons.name}} • <span class="text-lg text-gray-400">Constellation {{cons.level}}</span></h2>
                <DescriptionTicker v-for="(desc, idx) in (descMode ? cons.description : cons.originalDescription)" :key="`cons-desc-${idx}`" :description="desc" />
              </div>
            </div>
          </div>
        </div>
        <Transition name="fade">
          <nuxt-img
            :alt="`${charData.name} portrait`"
            v-if="expand && !isExpanding"
            class="absolute object-cover object-top opacity-5 right-0 bottom-0 -z-50"
            :modifiers="{ position: 'top', sharpen: 2 }"
            width="800" :height="height()"  :src="charData.portrait"
            loading="lazy" />
        </Transition>
      </div>
    </Transition>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {Character} from "~/src/models/character";
import DescriptionTicker from "~/components/character-list/DescriptionTicker.vue";

const props = defineProps<{
  charData: Character,
  descMode: Boolean
}>()

const expand = ref(false)
const isExpanding = ref(false)
const expandImages = ref([false, false, false, false])
const infoBox = ref<HTMLDivElement | null>(null)
const height = () => {
  if(infoBox.value !== null) return Math.max(infoBox.value.scrollHeight - 400, 1)
  else return 1
}

const toggleExpand = () => {
  expand.value = !expand.value
  isExpanding.value = true
  setTimeout(()=> {
    isExpanding.value = false
  }, 500)
}

const log = (msg: any) => {
  console.log(msg)
}
</script>

<style scoped>
  .desc-move, /* apply transition to moving elements */
  .desc-enter-active,
  .desc-leave-active {
    transition: all 0.5s ease;
  }

  .desc-enter-from,
  .desc-leave-to {
    opacity: 0;
    max-height: 0;
    margin-top: 0;
  }

  .desc.enter.to,
  .desc-leave-from {
    max-height: 1920px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

</style>