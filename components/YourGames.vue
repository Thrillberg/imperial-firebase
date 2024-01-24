<template>
  <v-container>
    <v-row>
      <v-col class="text-h5">
        Your Games
      </v-col>
    </v-row>
    <v-row
      v-masonry
      item-selector=".game"
    >
      <v-col
        v-for="game of orderedGames"
        :key="game.id"
        v-masonry-tile
        class="game"
        cols="6"
      >
        <router-link
          :to="{ path: '/games/' + game.id }"
          style="text-decoration: none"
        >
          <v-hover>
            <template #default="{ isHovering, props }">
              <v-card
                :title="game.name + (game.players.length === 1 ? ' (solo)' : '')"
                :subtitle="currentPlayer(game)"
                :color="backgroundColor(isHovering, nationColors(game.latestState.state.state.currentNation))"
                v-bind="props"
              >
                <template
                  v-if="game.currentPlayerName
                    && game.currentPlayerName === user.displayName
                    && !game.winner"
                  #prepend
                >
                  <v-btn
                    icon="mdi-star"
                    color="yellow"
                  />
                </template>
                <v-card-text>
                  <Board
                    :config="boardConfigs[game.baseGame]"
                    :game="Imperial.loadFromJSON(game.latestState.state.state)"
                    :game-started="true"
                  />
                  <v-row v-if="game.latestState">
                    <v-col
                      v-for="player of players(game)"
                      :key="player.name"
                    >
                      <div>{{ player.name }}</div>
                      <Flag
                        v-for="nation of player.nations"
                        :key="nation"
                        :nation="nation"
                        width="30"
                        height="20"
                      />
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </router-link>
      </v-col>
    </v-row>
    <CurrentGames :games="currentGames" />
  </v-container>
</template>

<script>
import Board from './Board.vue';

import nationColors from '~/nationColors';
import Imperial from '../../Domain/ImperialGameCoordinator';
import Flag from './flags/Flag.vue';

import toTime from '../toTime';
import imperialBoardConfigs from '../imperialBoardConfigs';
import imperial2030BoardConfigs from '../imperial2030BoardConfigs';
import imperialAsiaBoardConfigs from '../imperialAsiaBoardConfigs';
import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore';

export default {
  name: 'YourGames',
  components: { Board, Flag },
  props: {
    currentGames: { type: Array, default: () => {} },
    games: { type: Array, default: () => [] },
    user: { type: Object, default: () => {} },
  },
  async setup() {
    const boardConfigs = {
      imperial: imperialBoardConfigs,
      imperialEurope2030: imperialBoardConfigs,
      imperial2030: imperial2030BoardConfigs,
      imperialAsia: imperialAsiaBoardConfigs,
    };
    return { boardConfigs };
  },
  computed: {
    orderedGames() {
      return [...this.games].sort((a, b) => {
        if (a.winner === b.winner) {
          return 0;
        } if (a.winner === null) {
          return -1;
        } if (b.winner === null) {
          return 1;
        }
        return 0;
      });
    },
    Imperial() {
      return Imperial;
    },
  },
  methods: {
    backgroundColor(isHovering, color) {
      return isHovering ? color : `${color}88`;
    },
    currentPlayer(game) {
      if (game.winner) {
        return `${game.winner} won!`;
      } if (game.currentPlayerName) {
        return `${game.currentPlayerName}'s turn`;
      } if (game.startedAt) {
        return 'Computer player\'s turn';
      }
      return '';
    },
    players(game) {
      const players = [];

      for (const player of game.players) {
        const playerNations = [];
        const playerObj = { name: player.name };
        const { nations, currentNation } = game.latestState.state.state;

        nations.forEach((nation) => {
          if (nation[Object.keys(nation)[0]].controller === player.name) {
            const nationName = Object.keys(nation)[0];
            playerNations.push(nationName);

            if (currentNation === nationName) {
              playerObj.itsMyTurn = true;
            }
          }
        });

        playerObj.nations = playerNations;
        players.push(playerObj);
      }

      return players;
    },
    toTime(date) {
      return toTime(date);
    },
    variant(baseGame) {
      if (baseGame === 'imperial') {
        return 'Imperial (Classic)';
      } if (baseGame === 'imperialEurope2030') {
        return 'Imperial (2030 Rules)';
      } if (baseGame === 'imperial2030') {
        return 'Imperial 2030';
      } if (baseGame === 'imperialAsia') {
        return 'Imperial Asia';
      }
      return '';
    },
    nationColors(nation) {
      return nationColors[nation];
    },
  },
};
</script>
