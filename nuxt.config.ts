import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/ico', href: "/assets/favicon.ico" }]
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    'nuxt-vuefire',
    'nuxt-svgo',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: "AIzaSyA5AIFRrcmnUde__lreOFWaBclo9hUS0pU",
      authDomain: "imperial-8ea0c.firebaseapp.com",
      databaseURL: "https://imperial-8ea0c-default-rtdb.firebaseio.com",
      projectId: "imperial-8ea0c",
      storageBucket: "imperial-8ea0c.appspot.com",
      messagingSenderId: "780494536770",
      appId: "1:780494536770:web:d7c77b5dfc0ca5f4b6eddb",
      measurementId: "G-1Y0TL3752V"
    },
  },
  nitro: {
    firebase: {
      gen: 2,
    }
  }
})

