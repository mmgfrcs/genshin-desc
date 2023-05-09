<template>
  <div v-if="charData" class="flex grow flex-col">
    <!-- The Top Panel -->
    <div class="relative z-0 self-end w-full h-screen bg-opacity-20" :class="{
      'bg-rose-900': charData.element === 'pyro',
      'bg-blue-900': charData.element === 'hydro',
      'bg-yellow-900': charData.element === 'geo',
      'bg-fuchsia-900': charData.element === 'electro',
      'bg-cyan-900': charData.element === 'cryo',
      'bg-teal-900': charData.element === 'anemo',
      'bg-green-900': charData.element === 'dendro'
    }">
      <div class="p-4">
        <button type="button" class="cursor-pointer" @click="$router.back()">&lt; Back</button>
      </div>
      <img class="absolute top-0 left-0 bottom-0 right-0 opacity-20 w-full h-screen object-cover -z-10" width="3840" height="2160" src="/img/amber/Explosive_Puppet_Hold_Preview.gif" loading="lazy" />
      <nuxt-img class="inline-block absolute top-0 right-8 h-screen object-cover object-top" width="800" height="1200" :modifiers="{ position: 'top' }" :src="charData.portrait" loading="lazy" />
      <div class="absolute bottom-0 p-8 pt-32 w-full bg-gradient-to-t from-gray-900 via-gray-900 via-40% to-transparent">
        <h1 class="text-4xl mb-4">{{charData.name}} <nuxt-img v-for="n in charData.rarity" :key="`rarity${n}`" :alt="`rarity star icon`" src="/img/icons/round-star.svg" width="40" height="40" placeholder class="inline" loading="lazy"/></h1>
        <h2 class="text-2xl">
          <ul>
            <li class="inline-block after:content-['_•'] mr-2 align-middle">
              <span v-tooltip="$utilities.titleCase(charData.element)"><nuxt-img :alt="`${charData.element} element icon`" :src="`/img/icons/elements/${charData.element}.webp`" width="64" height="64" class="inline" loading="lazy" /></span>
            </li>
            <li class="inline-block align-middle">
              <nuxt-img v-tooltip="$utilities.titleCase(charData.weapon)" :src="$utilities.getWeaponIconSrc(charData.weapon)" width="64" class="inline" loading="lazy"/>
            </li>
          </ul>
        </h2>
      </div>
    </div>
    <!-- The Rest of the page -->
    <div class="p-4 pt-6 flex flex-col gap-8 bg-gray-900">
        <div class="flex flex-col gap-4">
          <div v-for="(talent, idx) in charData.talents" class="flex flex-1 flex-row gap-6">
            <div class="flex flex-col gap-4 w-1/3">
              <div class="flex flex-row gap-4">
                <nuxt-img class="inline w-[96px] h-[96px] self-center" :src="talent.icon" loading="lazy" />
                <span class="flex flex-col gap-1 flex-1 justify-center">
                  <p class="text-2xl">{{talent.name}}</p>
                  <p class="text-lg text-gray-300">{{$utilities.getTalentTypeStr(talent.type)}}</p>
                </span>
              </div>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <tbody>
                    <tr class="border-b border-gray-200 dark:border-gray-700 ">
                      <th scope="row" class="px-6 py-4 w-1/3 font-medium font-bold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Scale
                      </th>
                      <td class="px-6 py-4 bg-gray-200 dark:bg-gray-800">
                        Silver
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700 ">
                      <th scope="row" class="px-6 py-4 w-1/3 font-medium font-bold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Scale
                      </th>
                      <td class="px-6 py-4 bg-gray-200 dark:bg-gray-800">
                        Silver
                      </td>
                    </tr>
                    <tr class="border-b border-gray-200 dark:border-gray-700 ">
                      <th scope="row" class="px-6 py-4 w-1/3 font-medium font-bold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Scale
                      </th>
                      <td class="px-6 py-4 bg-gray-200 dark:bg-gray-800">
                        Silver
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" class="px-6 py-4 w-1/3 font-medium font-bold text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                        Scale
                      </th>
                      <td class="px-6 py-4 bg-gray-200 dark:bg-gray-800">
                        Silver
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="flex flex-col grow">
              <CharacterListDescriptionTicker v-for="(desc,idx) in (descMode ? talent.description : talent.originalDescription)" :key="`talent-desc-${idx}`" :description="desc" />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div v-for="psv in charData.passives" :key="psv.type" class="flex flex-row gap-4">
            <nuxt-img class="inline w-[64px] h-[64px]" :src="psv.icon" :alt="'Icon of ' + psv.name" loading="lazy" />
            <div class="flex flex-col">
              <h2 class="text-2xl items-center">{{psv.name}} • <span class="text-lg text-gray-400">{{$utilities.getPassiveTypeStr(psv.type)}}</span></h2>
              <CharacterListDescriptionTicker v-for="(desc, idx) in (descMode ? psv.description : psv.originalDescription)" :key="`psv-desc-${idx}`" :description="desc" />
            </div>
          </div>
          <div v-for="cons in charData.constellations" :key="cons.level" class="flex flex-row gap-4">
            <nuxt-img class="inline w-[64px] h-[64px]" :src="cons.icon" loading="lazy" />
            <div class="flex flex-col">
              <h2 class="text-2xl items-center">{{cons.name}} • <span class="text-lg text-gray-400">Constellation {{cons.level}}</span></h2>
              <CharacterListDescriptionTicker v-for="(desc, idx) in (descMode ? cons.description : cons.originalDescription)" :key="`cons-desc-${idx}`" :description="desc" />
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Character } from '~/src/models/character'
import { useAsyncData, useNuxtApp, useRoute } from '#app'
import { queryContent, useI18n } from '#imports'

const route = useRoute()
const i18n = useI18n()

const {$utilities} = useNuxtApp()

const {data: charData} = await useAsyncData(route.params.character + "-data", ctx => queryContent<Character>(`/characters/${route.params.character}`).locale(i18n.locale.value).findOne())
const descMode = ref(true)
</script>

<style scoped>

</style>
