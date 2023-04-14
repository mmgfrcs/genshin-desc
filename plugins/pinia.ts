// Vue 3
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { defineNuxtPlugin } from '#app'
import FloatingVue from 'floating-vue'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(createPinia())
})