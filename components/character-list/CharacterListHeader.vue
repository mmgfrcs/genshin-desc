<template>
  <header class="block flex p-4 gap-x-2 bg-gradient-to-l from-transparent via-transparent" :class="{
    'border-b-2 pb-4 border-gray-400': expandMode,
    'to-rose-800': charData.element === 'pyro',
    'to-blue-800': charData.element === 'hydro',
    'to-yellow-800': charData.element === 'geo',
    'to-fuchsia-800': charData.element === 'electro',
    'to-cyan-800': charData.element === 'cryo',
    'to-teal-800': charData.element === 'anemo',
    'to-green-800': charData.element === 'dendro'
  }">
    <nuxt-img class="inline" width="64" height="64" :alt="`${charData.name} icon`" :src="charData.icon" loading="lazy" />
    <span class="self-center">
      <NuxtLink :to="`/${charData.id}`" class="text-2xl">
        <ul>
          <li class="inline-block after:content-['_•'] mr-2 align-middle">{{charData.name}}</li>
          <li class="inline-block after:content-['_•'] mr-2 align-middle">
            <span v-tooltip="$utilities.titleCase(charData.element)"><nuxt-img :alt="`${charData.element} element icon`" :src="`/img/icons/elements/${charData.element}.webp`" width="32" height="32" class="inline" loading="lazy" /></span>
          </li>
          <li class="inline-block after:content-['_•'] mr-2 align-middle">
            <span v-tooltip="`${charData.rarity}-star`"><nuxt-img v-for="n in charData.rarity" :key="`rarity${n}`" :alt="`rarity star icon`" src="/img/icons/round-star.svg" width="32" height="32" placeholder class="inline" loading="lazy"/></span>
          </li>
          <li class="inline-block align-middle">
            <nuxt-img v-tooltip="$utilities.titleCase(charData.weapon)" :src="$utilities.getWeaponIconSrc(charData.weapon)" width="32" class="inline" loading="lazy"/>
          </li>
        </ul>
      </NuxtLink>
    </span>
    <span class="flex-1 cursor-pointer" @click="toggleExpand"></span>
    <Icon name="mdi:chevron-down" class="self-center cursor-pointer" size='3em' />
  </header>
</template>

<script lang="ts">
import {PropType} from 'vue'
import {Character} from '~/src/models/character'
export default {
  name: "CharacterListHeader",
  props: {
    charData: {
      type: Object as PropType<Character>,
      required: true
    },
    expandMode: Boolean
  },
  methods: {
    toggleExpand() {
      //@ts-ignore
      this.$emit('list:toggleExpand')
    },
  }
}
</script>

