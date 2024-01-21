<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          First time playing Imperial?
        </v-card-title>
        <v-card-subtitle>Try it out with a solo hotseat game!</v-card-subtitle>
        <v-card-text>
          <b>Imperial</b> is a board game where players act as investors in nations.
          Players take control of nations by buying bonds.
          With the control of nations, players can move military units and occupy territory.
          It is not a wargame, however, and ultimate success relies on prudent bond purchases.
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary-darken-1"
            @click.prevent="startSoloGame"
          >
            Play a Solo Hotseat Game
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          Played Imperial before?
        </v-card-title>
        <v-card-subtitle>Jump right into a game or start your own!</v-card-subtitle>
        <v-card-text>
          <b>playimperial.club</b> supports both live and async games.
          We also have <a href="https://discord.gg/Q2Ynzp2Axs">an active Discord community</a>.
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="openGamesCount > 0"
            color="primary-darken-1"
            to="/games/open"
          >
            Find a Game
          </v-btn>
          <v-btn
            color="primary-darken-1"
            @click="setAnonymous"
          >
            Start a New Game
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <CurrentGames :games="games" />
</template>

<script>
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import CurrentGames from './CurrentGames.vue';
import { faker } from '@faker-js/faker';
import anonymityConfirmed from '../lib/anonymityConfirmed';

export default {
  name: 'FirstTimeUserCards',
  components: {
    CurrentGames,
  },
  props: {
    lovelyStringName: { type: String, default: '' },
    games: { type: Array, default: () => [] },
    openGamesCount: { type: Number, default: 0 },
  },
  methods: {
    async setAnonymous(e) {
      anonymityConfirmed(this.lovelyStringName)
      this.$router.push('/games/new');
    },
    async startSoloGame() {
      const db = getFirestore();
      const { displayName, uid } = await anonymityConfirmed(this.lovelyStringName)
      const lovelyString = faker.word.adjective() + ' ' + faker.word.noun();
      const gameRef = await addDoc(collection(db, "games"), {
        name: lovelyString,
        host: displayName,
        baseGame: 'imperial',
        variant: 'standard',
        isGamePublic: false,
        players: [{ name: displayName, id: uid }],
        createdAt: new Date(),
      });
      this.$router.push(`/games/${gameRef.id}?solo=true`);
    },
  },
};
</script>
