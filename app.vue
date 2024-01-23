<template>
  <ClientOnly>
    <v-app>
      <div v-if="gamesFetched">
        <Header
          :user="user"
          :count-of-open-games="openGames.length.toString()"
          :count-of-cloned-games="clonedGames.length"
          :lovely-string="lovelyString"
          @sign_out="signOutUser"
          @anonymity_confirmed="anonymityConfirmed(lovelyString)"
        />
        <v-main>
          <NuxtPage
            :user="user"
            :games="games"
            :open-games="openGames"
            :cloned-games="clonedGames"
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
import { getFirestore, getDocs, collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";

import Header from './components/Header.vue';
import translateToGameData from "./translateToGameData";

import anonymityConfirmed from './lib/anonymityConfirmed';
import { faker } from "@faker-js/faker";

const user = useCurrentUser();
const db = getFirestore();
const auth = getAuth();

const signOutUser = async () => await signOut(auth);

const gamesFetched = ref(false);
const games = ref([]);
const openGames = ref([]);
const clonedGames = ref([]);
const gamesCollection = collection(db, 'games');

const getLatestState = async (snapshotsCollection, game, doc) => {
  const snapshotsQuery = await query(snapshotsCollection, orderBy('timestamp', 'desc'), limit(1));
  const snapshotsSnap = await getDocs(snapshotsQuery);
  let latestState;
  snapshotsSnap.forEach((snapshot) => {
    latestState = snapshot.data();
  })
  const gameIndex = games.value.findIndex((game) => game.id === doc.id);
  games.value.splice(gameIndex, 1)
  games.value.push(Object.assign({}, translateToGameData(game), { id: doc.id, latestState }));
}

const getGames = async () => {
  const gamesSnap = await getDocs(query(gamesCollection));
  games.value = [];
  openGames.value = [];
  clonedGames.value = [];
  gamesSnap.forEach(async (doc) => {
    const game = doc.data();
    // Populate all games
    const snapshotsCollection = collection(db, 'games', doc.id, 'snapshots');
    const snapshotsUnsub = onSnapshot(snapshotsCollection, async () => {
      await getLatestState(snapshotsCollection, game, doc);
    });

    let inGame = false;
    game.players.forEach((player) => {
      if (player.name === user.displayName) {
        inGame = true;
      }
    });

    // Populate open, joinable games
    if (
      !game.startedAt &&
      !inGame &&
      !game.forceEndedAt &&
      !game.clonedFromGame &&
      !game.cancelledAt &&
      game.isPublic
    ) {
      openGames.value.push(Object.assign({}, translateToGameData(game), { id: doc.id }))
    // Populate cloned games
    } else if (inGame && game.clonedFromGame) {
      clonedGames.value.push(game)
    }
  });
}

await getGames();
games.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
openGames.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
clonedGames.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
gamesFetched.value = true;

const gamesUnsub = onSnapshot(gamesCollection, async () => {
  await getGames();
});

const lovelyString = faker.person.firstName() + " the " + faker.animal.dog();
</script>
