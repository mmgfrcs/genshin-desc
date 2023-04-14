import { defineNuxtPlugin } from '#app'
import { createPinia } from 'pinia'
import anime from "animejs"

export default defineNuxtPlugin(({ vueApp }) => {
  return {
    provide: {
      animejs: (params: anime.AnimeParams) => anime(params)
    }
  }
})