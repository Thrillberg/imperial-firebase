<template>
  <v-container v-if="isFirstTimeUser">
    <FirstTimeUserCards
      :games="currentGames"
      :open-games-count="openGamesCount"
      :lovely-string-name="lovelyString"
    />
  </v-container>
  <v-container v-else>
    <YourGames
      v-if="user"
      :games="yourGames"
    />
    <CurrentGames :games="currentGames" />
  </v-container>
</template>

<script>
import CurrentGames from '~/components/CurrentGames.vue';
import FirstTimeUserCards from '../components/FirstTimeUserCards.vue';
import YourGames from '../components/YourGames.vue';

import setFavicon from '../setFavicon';

export default {
  name: 'Home',
  components: {
    CurrentGames, FirstTimeUserCards, YourGames,
  },
  props: {
    games: { type: Array, default: () => [] },
    gamesFetched: { type: Boolean, default: false },
    lovelyString: { type: String, default: '' },
    openGamesCount: { type: Number, default: 0 },
    user: { type: Object, default: () => {} },
    users: { type: Array, default: () => [] },
  },
  computed: {
    yourGames() {
      return this.games.filter((game) => {
        let inGame = false;
        game.players.forEach((player) => {
          if (player.name === this.user.displayName) {
            inGame = true;
          }
        });
        return inGame && !game.forceEndedAt && !game.clonedFromGame;
      });
    },
    currentGames() {
      return this.games.filter(
        (game) => game.startedAt && !game.forceEndedAt && !game.winner && !game.clonedFromGame && game.players.length > 1,
      );
    },
    currentSoloGames() {
      return this.games.filter(
        (game) => game.startedAt && !game.forceEndedAt && !game.winner && !game.clonedFromGame && game.players.length === 1,
      );
    },
    isFirstTimeUser() {
      return !this.user;
    },
  },
  created() {
    document.title = 'Imperial';
    setFavicon(this.games, this.user, this.$route.params.id);
  },
};
</script>
