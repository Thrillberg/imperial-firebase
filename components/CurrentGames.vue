<template>
  <v-row>
    <v-col class="text-h5">
      Current Games
    </v-col>
  </v-row>
  <v-row
    v-masonry
    item-selector=".game"
  >
    <v-col
      v-for="game of games"
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
              :subtitle="currentPlayer(game) ? currentPlayer(game) + '\'s turn' : ''"
              :color="backgroundColor(isHovering, nationColors(game.latestState.currentNation))"
              v-bind="props"
            >
              <v-card-text>
                <Board
                  :config="boardConfigs[game.baseGame]"
                  :game="Imperial.loadFromJSON(game.latestState)"
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
</template>

<script>
import nationColors from '~/nationColors';
import toTime from '../toTime';
import Board from './Board.vue';
import Flag from './flags/Flag.vue';

import Imperial from '../../Domain/ImperialGameCoordinator';
import imperialBoardConfigs from '../imperialBoardConfigs';
import imperial2030BoardConfigs from '../imperial2030BoardConfigs';
import imperialAsiaBoardConfigs from '../imperialAsiaBoardConfigs';

export default {
  name: 'CurrentGames',
  components: { Board, Flag },
  props: { games: { type: Array, default: () => [] } },
  async setup() {
    const boardConfigs = {
      imperial: imperialBoardConfigs,
      imperialEurope2030: imperialBoardConfigs,
      imperial2030: imperial2030BoardConfigs,
      imperialAsia: imperialAsiaBoardConfigs,
    }
    return { boardConfigs };
  },
  computed: {
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
        return game.currentPlayerName;
      } if (game.startedAt) {
        return 'Computer player';
      }
      return '';
    },
    nationColors(nation) {
      return nationColors[nation];
    },
    players(game) {
      const players = [];

      for (const player of game.players) {
        const playerNations = [];
        const playerObj = { name: player.id };
        const { nations, currentNation } = game.latestState;

        nations.forEach((nation) => {
          if (nation[Object.keys(nation)[0]].controller === player.id) {
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
  },
};
</script>
