<template>
  <ClientOnly>
    <v-app>
      <div v-if="gamesFetched">
        <Header
          :user="user"
          :count-of-open-games="countOfOpenGames().toString()"
          :count-of-cloned-games="countOfClonedGames()"
          :lovely-string="lovelyString"
          @sign_out="signOutUser"
          @anonymity_confirmed="anonymityConfirmed(lovelyString)"
        />
        <v-main>
          <NuxtPage
            :user="user"
            :games="games"
            :lovely-string="lovelyString"
          />
        </v-main>
      </div>
      <div v-else>hihihi</div>
    </v-app>
  </ClientOnly>
</template>

<script setup>
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, collection, query, onSnapshot } from "firebase/firestore";

import Header from './components/Header.vue';
import translateToGameData from "./translateToGameData";

import anonymityConfirmed from './lib/anonymityConfirmed';
import { faker } from "@faker-js/faker";

const route = useRoute();
const user = useCurrentUser();
const db = getFirestore();
const auth = getAuth();

const signOutUser = async () => await signOut(auth);

const gamesFetched = ref(false);
const games = ref([]);
const gamesCollection = collection(db, 'games');

const getGames = async () => {
  const gamesSnap = await getDocs(query(gamesCollection));
  games.value = [];
  gamesSnap.forEach((doc) => {
    games.value.push(Object.assign({}, translateToGameData(doc.data()), { id: doc.id }));
  });
}
await getGames();
gamesFetched.value = true;

const actionsUnsub = onSnapshot(gamesCollection, async () => {
  await getGames();
});

const lovelyString = faker.person.firstName() + " the " + faker.animal.dog();

const countOfOpenGames = () => {
  const games = [].filter((game) => {
    let inGame = false;
    game.players.forEach((player) => {
      if (player.name === this.profile.username) {
        inGame = true;
      }
    });
    return !game.startedAt && !inGame && !game.forceEndedAt && !game.clonedFromGame && game.isPublic;
  });
  const openGames = games.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return openGames.length;
};

const countOfClonedGames = () => {
  const games = [].filter((game) => {
    let inGame = false;
    game.players.forEach((player) => {
      if (player.name === this.profile.username) {
        inGame = true;
      }
    });
    return inGame && game.clonedFromGame;
  });
  const clonedGames = games.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return clonedGames.length;
};
</script>
