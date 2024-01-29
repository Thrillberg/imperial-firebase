<template>
  <v-container v-if="isFirstTimeUser">
    <FirstTimeUserCards
      :games="currentGames()"
      :open-games-count="openGamesCount"
      :lovely-string-name="lovelyString"
    />
  </v-container>
  <v-container v-else>
    <YourGames
      v-if="user"
      :games="yourGames()"
      :current-games="currentGames()"
      :user="user"
    />
  </v-container>
</template>

<script setup>
import FirstTimeUserCards from '../components/FirstTimeUserCards.vue';
import YourGames from '../components/YourGames.vue';

import setFavicon from '../setFavicon';

const props = defineProps({
  games: { type: Array, default: () => [] },
  gamesFetched: { type: Boolean, default: false },
  lovelyString: { type: String, default: '' },
  openGamesCount: { type: Number, default: 0 },
  user: { type: Object, default: () => {} },
  users: { type: Array, default: () => [] },
});

const route = useRoute();
setFavicon(props.games, props.user, route.params.id);

const yourGames = () => {
  return props.games.filter((game) => {
    let inGame = false;
    game.players.forEach((player) => {
      if (player.id === props.user.displayName) {
        inGame = true;
      }
    });
    return inGame && !game.forceEndedAt && !game.clonedFromGame;
  });
};

const currentGames = () => {
  return props.games.filter(
    (game) => game.startedAt && !game.forceEndedAt && !game.winner && !game.clonedFromGame && game.players.length > 1,
  );
};

const currentSoloGames = () => {
  return props.games.filter(
    (game) => game.startedAt && !game.forceEndedAt && !game.winner && !game.clonedFromGame && game.players.length === 1,
  );
};
const isFirstTimeUser = !props.user;
</script>
