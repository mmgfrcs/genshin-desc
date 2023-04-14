<template>
    <NuxtPage />
</template>

<script setup lang='ts'>
  import format from 'date-fns/format'
  import { initFlowbite } from 'flowbite'

  onMounted(() => {
    initFlowbite()
  })
  useHead({
    title: 'genshin-desc',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    bodyAttrs: {
      class: 'dark:bg-gray-800 dark:text-gray-300'
    }
  })
</script>

<style>
  * {
    font-family: "Inter", "Segoe UI", "Geneva", "Verdana", sans-serif;
  }

  .char-portrait {
    position: absolute;
    right: 0px;
    overflow: hidden;
  }

  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.5s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
  .layout-enter-active,
  .layout-leave-active {
    transition: all 0.4s;
  }
  .layout-enter-from,
  .layout-leave-to {
    filter: grayscale(1);
  }
</style>