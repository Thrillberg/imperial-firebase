import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import nationColors from '../nationColors';

const darkTheme = {
  dark: true,
  colors: {
    primary: '#517564',
    'primary-darken-1': '#3e594c',
    secondary: '#bab291',
    ...nationColors,
  },
};

const lightTheme = {
  dark: false,
  colors: {
    primary: '#A7F3D0',
    'primary-darken-1': '#065F46',
    secondary: '#fef3c7',
    ...nationColors,
  },
};

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'lightTheme',
      themes: {
        darkTheme,
        lightTheme,
      },
    },
  })
  app.vueApp.use(vuetify)
})
