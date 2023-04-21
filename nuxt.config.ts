// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  //@ts-ignore
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@nuxtjs/i18n',
    `@nuxtjs/google-fonts`,
    '@kevinmarrec/nuxt-pwa'
  ],
  content: {
    locales: ["en", "id"]
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.ts' },
      { code: 'id', iso: 'id-ID', file: 'id.ts' }
    ],
    langDir: "./lang",
    defaultLocale: 'en',
    lazy: true
  },
  googleFonts: {
    families: {
      "Inter": true,
    },
    download: true
  },
  tailwindcss: {
    config: {
      content: [
        // other files...
        "./node_modules/flowbite.{js,ts}"
      ],
      plugins: [
        require('flowbite')
      ]
    }
  },
  image: {
    provider: 'ipx'
  },
  pwa: {
    workbox: {
      offline: true
    }
  }
})
