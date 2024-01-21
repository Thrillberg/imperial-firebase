import { VueMasonryPlugin } from "vue-masonry"

export default defineNuxtPlugin((app) => {
  app.vueApp.use(VueMasonryPlugin)
})