<template>
  <div class="container mx-auto mt-12 mb-12 flex flex-col gap-12">
    <h1 class="text-4xl">{{$t('title')}}</h1>
    <div class="flex flex-row gap-8">
      <input type="search" placeholder="Enter search term..." v-model="searchTerm" @input="refreshChars" class="w-[400px] block p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <div class="flex gap-1">
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.element !== undefined && filters.element.$in.includes('pyro'),
        }" @click="toggleFilter('element', 'pyro')">
          <nuxt-img alt="`Filter pyro" width="40" src="/img/icons/elements/pyro.webp" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.element !== undefined && filters.element.$in.includes('hydro'),
        }" @click="toggleFilter('element', 'hydro')">
          <nuxt-img alt="`Filter hydro" width="40" src="/img/icons/elements/hydro.webp" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.element !== undefined && filters.element.$in.includes('anemo'),
        }" @click="toggleFilter('element', 'anemo')">
          <nuxt-img alt="`Filter anemo" width="40" src="/img/icons/elements/anemo.webp" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.element !== undefined && filters.element.$in.includes('electro'),
        }" @click="toggleFilter('element', 'electro')">
          <nuxt-img alt="`Filter electro" width="40" src="/img/icons/elements/electro.webp" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.element !== undefined && filters.element.$in.includes('dendro'),
        }" @click="toggleFilter('element', 'dendro')">
          <nuxt-img alt="`Filter dendro" width="40" src="/img/icons/elements/dendro.webp" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.element !== undefined && filters.element.$in.includes('cryo'),
        }" @click="toggleFilter('element', 'cryo')">
          <nuxt-img alt="`Filter cryo" width="40" src="/img/icons/elements/cryo.webp" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.element !== undefined && filters.element.$in.includes('geo'),
        }" @click="toggleFilter('element', 'geo')">
          <nuxt-img alt="`Filter geo" width="40" src="/img/icons/elements/geo.webp" />
        </button>
      </div>
      <div class="flex">
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.weapon !== undefined && filters.weapon.$in.includes('SWORD'),
        }" @click="toggleFilter('weapon', 'SWORD')">
          <nuxt-img alt="`Filter sword" width="40" src="/img/icons/weapons/sword.svg" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.weapon !== undefined && filters.weapon.$in.includes('CLAYMORE'),
        }" @click="toggleFilter('weapon', 'CLAYMORE')">
          <nuxt-img alt="`Filter claymore" width="40" src="/img/icons/weapons/claymore.svg" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.weapon !== undefined && filters.weapon.$in.includes('BOW'),
        }" @click="toggleFilter('weapon', 'BOW')">
          <nuxt-img alt="`Filter bow" width="40" src="/img/icons/weapons/bow.svg" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.weapon !== undefined && filters.weapon.$in.includes('POLEARM'),
        }" @click="toggleFilter('weapon', 'POLEARM')">
          <nuxt-img alt="`Filter polearm" width="40" src="/img/icons/weapons/polearm.svg" />
        </button>
        <button type="button" class='transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.weapon !== undefined && filters.weapon.$in.includes('CATALYST'),
        }" @click="toggleFilter('weapon', 'CATALYST')">
          <nuxt-img alt="`Filter catalyst" width="40" src="/img/icons/weapons/catalyst.svg" />
        </button>
      </div>
      <div class="flex grow">
        <button type="button" class='flex flex-row inline gap-1 h-full transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.rarity !== undefined && filters.rarity.$in.includes(5),
        }" @click="toggleFilter('rarity', 5)">
          <span class="self-center text-2xl">5</span>
          <nuxt-img class="inline self-center" alt="`Filter sword" width="32" src="/img/icons/round-star.svg" />
        </button>
        <button type="button" class='flex gap-1 inline h-full transition-all rounded-xl p-2 hover:bg-gray-900 cursor-pointer border border-gray-800' :class="{
          'bg-gray-900 cursor-pointer border-white': filters.rarity !== undefined && filters.rarity.$in.includes(4),
        }" @click="toggleFilter('rarity', 4)">
          <span class="self-center text-2xl">4</span>
          <nuxt-img class="inline self-center" alt="`Filter sword" width="32" src="/img/icons/round-star.svg" />
        </button>
      </div>
      <div class="flex gap-2">
        <div class="flex self-center items-center justify-center h-12" v-tooltip="`Description shown is ${descMode ? 'modified from the original' : 'as shown in-game'}`">
          <label class="relative inline-flex items-centerr cursor-pointer">
            <input @click="descMode = !descMode" type="checkbox" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-lg font-medium text-gray-900 dark:text-gray-300">{{descMode ? "Modified" : "Original"}}</span>
          </label>
        </div>
        <a v-tooltip="'Settings'" href="#" class="self-center">
          <Icon class="text-xl transition" name="mdi:cog" size="2em" />
        </a>
      </div>
    </div>

    <TransitionGroup name="charlist" tag="div" class="transition-all flex flex-col gap-4">
      <CharacterList v-for="data in charDatas" :key="data.id" :char-data="data" :desc-mode="descMode" />
    </TransitionGroup>
    <p class="text-gray-400">Version {{version?.version || "Unknown"}} • <a target="_blank" class="hover:text-blue-600 hover:underline" :href="`https://github.com/genshindev/api/commit/${version?.remoteSha || 'latest'}`">{{version?.remoteSha ?? "-"}}</a>, last updated {{formatDate(version?.remoteLastUpdate || "Unknown")}}</p>
  </div>
</template>

<script setup lang="ts">
import format from 'date-fns/format'
import { Character } from '~/src/models/character';

let origCharData: Character[] = []

const i18n = useI18n()
const descMode = ref(true)
const searchTerm = ref("")
const filters = ref<{ [key: string]: {$in: Array<string|number>}; }>({})
const {data: charDatas, refresh} = await useAsyncData("characters", ctx => {
  let searchTerms = {name: {$regex: `/${searchTerm.value}/ig`}, ...filters.value}
  return queryContent<Character>(`characters`).locale(i18n.locale.value).where(searchTerms).sort({name: 1}).find()
})
const {data: version} = await useAsyncData("version", ctx => { return queryContent('/version').findOne()})

const formatDate = function (date: string) {
  return format(new Date(date), "MMMM Qo, yyyy HH:mm zz")
}

const refreshChars = async function() {
  if(process.server)
    await refresh()
  else if (charDatas.value !== null) {
    if (origCharData.length === 0) origCharData = charDatas.value
    else charDatas.value = origCharData

    charDatas.value = charDatas.value.filter(x=>{
      let filterName = x.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      let filterElement = filters.value.element?.$in?.includes(x.element) ?? true
      let filterWeapon = filters.value.weapon?.$in?.includes(x.weapon) ?? true
      let filterRarity = filters.value.rarity?.$in?.includes(x.rarity) ?? true
      console.log(filterName, filterElement, filterWeapon, filterRarity)
      return filterName && filterElement && filterWeapon && filterRarity
    })
  }
}

const toggleFilter = async function(type: string, value: string|number) {
  if(filters.value[type] === undefined)
    filters.value[type] = {$in: []}

  if(filters.value[type].$in.includes(value)){
    filters.value[type].$in = filters.value[type].$in.filter(x=>x !== value)
    if (filters.value[type].$in.length == 0) delete filters.value[type]
  }
  else filters.value[type].$in.push(value);

  await refreshChars()
}

</script>

<style scoped>
  .charlist-move, /* apply transition to moving elements */
  .charlist-enter-active,
  .charlist-leave-active {
    transition: all 0.5s ease;
  }

  .charlist-enter-from,
  .charlist-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* ensure leaving items are taken out of layout flow so that moving
     animations can be calculated correctly. */
  .charlist-leave-active {
    position: absolute;
  }
</style>
