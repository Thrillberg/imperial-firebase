<template>
  <v-app-bar
    :elevation="5"
    class="bg-primary"
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-btn
      v-if="route.path !== '/'"
      to="/"
      prepend-icon="mdi-home"
      stacked
    >
      Home
    </v-btn>
    <v-btn
      v-if="user && route.path !== '/games/new'"
      to="/games/new"
      class="bg-primary-darken-1"
      nuxt
    >
      New Game
    </v-btn>
    <v-app-bar-title />
    <div
      v-for="(error, index) in errors"
      :key="index"
    >
      <b>{{ error }}</b>
    </div>
    <v-menu>
      <template #activator="{ props }">
        <!-- User is registered and signed in -->
        <v-btn
          v-if="user && user.email"
          prepend-icon="mdi-account"
          class="text-none"
          stacked
          v-bind="props"
        >
          {{ user.displayName }}
        </v-btn>
        <!-- User is anonymous (not registered) and signed in -->
        <v-btn
          v-if="user && !user.email"
          prepend-icon="mdi-incognito"
          class="text-none"
          stacked
          v-bind="props"
        >
          {{ user.displayName }}
        </v-btn>
        <!-- User is not signed in -->
        <v-btn
          v-if="!user"
          icon="mdi-incognito"
          class="text-none"
          stacked
          v-bind="props"
        />
      </template>
      <v-list>
        <!-- User is registered and signed in -->
        <v-list-item
          v-if="user?.email"
          prepend-icon="mdi-account"
          title="Profile"
          :to="'/users/' + user?.uid"
        />
        <v-list-item
          v-if="user?.email"
          prepend-icon="mdi-logout"
          title="Sign out"
          @click="$emit('sign_out')"
        />
        <!-- User is anonymous (not registered) and signed in -->
        <v-list-item
          v-if="user && !user.email"
          prepend-icon="mdi-account-plus"
          title="Register"
          @click="register"
        />
        <v-list-item
          v-if="user && !user.email"
          prepend-icon="mdi-logout"
          title="Permanently sign out"
          @click="$emit('sign_out')"
        />
        <!-- User is not signed in -->
        <v-list-item
          v-if="!user"
          prepend-icon="mdi-account"
          title="Sign In"
          @click="signIn"
        />
        <v-list-item
          v-if="!user"
          prepend-icon="mdi-account-plus"
          title="Register"
          @click="register"
        />
        <v-list-item
          v-if="!user"
          prepend-icon="mdi-incognito"
          @click="$emit('anonymity_confirmed', lovelyString)"
        >
          Play anonymously as {{ lovelyString }}
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
      icon="mdi-theme-light-dark"
      @click="toggleTheme"
    />
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <v-list-item
        :title="'Open Games (' + countOfOpenGames + ')'"
        to="/games/open"
      >
        <template #prepend>
          <v-icon color="primary-darken-1">
            mdi-crown
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item
        v-if="countOfClonedGames > 0"
        title="Your Cloned Games"
        to="/cloned_games"
      >
        <template #prepend>
          <v-icon color="primary-darken-1">
            mdi-content-duplicate
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item
        title="About"
        to="/about"
      >
        <template #prepend>
          <v-icon color="primary-darken-1">
            mdi-information
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item
        title="Rankings"
        to="/rankings"
      >
        <template #prepend>
          <v-icon color="primary-darken-1">
            mdi-trophy
          </v-icon>
        </template>
      </v-list-item>
      <v-list-item
        title="Join on Discord"
        href="https://discord.gg/Q2Ynzp2Axs"
      >
        <template #prepend>
          <DiscordLogo class="v-icon v-icon--size-default" color="#5865F2" />
        </template>
      </v-list-item>
      <v-list-item
        title="Support on Patreon"
        href="https://www.patreon.com/playimperialclub"
      >
        <template #prepend>
          <PatreonLogo class="v-icon v-icon--size-default" color="#f1465a" />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useTheme } from 'vuetify';
import { faker } from '@faker-js/faker';
import DiscordLogo from '../assets/discord.svg';
import PatreonLogo from '../assets/patreon.svg';

const props = defineProps({
  countOfClonedGames: { type: Number, default: 0 },
  countOfOpenGames: { type: String, default: '0' },
  user: { type: Object, default: () => {} },
  lovelyString: { type: String, default: '' },
})

const emit = defineEmits(['anonymity_confirmed', 'sign_out']);

const theme = useTheme();
const route = useRoute();
const router = useRouter();

const errors = [];

const toggleTheme = () => { theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'; }; 

const drawer = ref(false);

const register = () => {
  if (route.path !== '/register') {
    router.push('/register');
  }
};

const signIn = () => {
  if (route.path !== '/sign_in') {
    router.push('/sign_in');
  }
};
</script>
