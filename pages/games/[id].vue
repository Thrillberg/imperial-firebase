<template>
  <v-sheet>
    <v-tooltip
      text="How to Play Imperial"
      location="bottom"
    >
      <template #activator="{ props }">
        <v-btn
          prepend-icon="mdi-help-circle-outline"
          variant="plain"
          size="x-large"
          style="position: fixed; z-index: 1; top: calc(100vh - 60px); height: 0px;"
          class="pr-13"
          v-bind="props"
        >
          <v-dialog
            v-model="rulesDialogFromSidebar"
            activator="parent"
            width="75%"
          >
            <v-card>
              <v-card-title>
                <v-toolbar color="surface">
                  How to Play Imperial
                  <template #append>
                    <v-btn
                      icon="mdi-close"
                      @click="rulesDialogFromSidebar = false"
                    />
                  </template>
                </v-toolbar>
              </v-card-title>
              <v-card-subtitle>
                A Brief and Incomplete Guide
              </v-card-subtitle>
              <Rules />
              <v-card-actions>
                <v-btn
                  color="primary-darken-1"
                  block
                  @click="rulesDialogFromSidebar = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
      </template>
    </v-tooltip>
    <v-row
      :class="playersInGame.length === 1 ? 'bg-secondary' : ''"
      justify="space-between"
      class="py-3"
    >
      <v-col class="my-auto mx-2">
        <span class="text-h5 mr-2">{{ game.name }} <span v-if="game.clonedFromGame">(clone)</span></span>
        <v-btn
          v-if="game.clonedFromGame && gameStarted"
          size="x-small"
          style="vertical-align: super;"
          color="primary"
          @click="goToSourceGame"
        >
          Back to source game
        </v-btn>
        <v-btn
          v-else-if="gameStarted"
          size="x-small"
          style="vertical-align: text-bottom;"
          color="primary"
          @click="cloneGame"
        >
          Clone game
        </v-btn>
      </v-col>
      <v-col
        v-if="playersInGame.length === 1"
        style="text-align: right;"
        class="mx-2"
      >
        <v-dialog
          v-model="rulesDialog"
          activator="parent"
          width="75%"
        >
          <template #activator="{ props }">
            <v-btn
              class="text-none"
              color="primary"
              prepend-icon="mdi-book-open-variant"
              v-bind="props"
            >
              How do I play Imperial?
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <v-toolbar color="surface">
                How to Play Imperial
                <template #append>
                  <v-btn
                    icon="mdi-close"
                    @click="rulesDialog = false"
                  />
                </template>
              </v-toolbar>
            </v-card-title>
            <v-card-subtitle>
              A Brief and Incomplete Guide
            </v-card-subtitle>
            <v-card-text>
              <i>
                You're playing a solo hotseat game, which means that you control all the players.
                Explore the rondel on the main game screen for information on what moves each nation can perform.
              </i>
            </v-card-text>
            <Rules />
            <v-card-actions>
              <v-btn
                color="primary-darken-1"
                block
                @click="rulesDialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-sheet v-if="gameStarted">
      <TurnStatus
        :game="imperial.instance"
        :user="user"
        :controlling-player-name="controllingPlayerName"
        :paused="paused()"
      />
      <v-card class="d-flex">
        <v-card class="d-flex">
          <v-tabs
            v-model="tab"
            color="primary-darken-1"
            direction="vertical"
          >
            <v-tab value="nations">
              <v-tooltip
                text="Nations"
                location="bottom"
              >
                <template #activator="{ props }">
                  <v-icon
                    v-bind="props"
                    size="x-large"
                  >
                    mdi-flag
                  </v-icon>
                </template>
              </v-tooltip>
            </v-tab>
            <v-tab value="players">
              <v-tooltip
                text="Players"
                location="bottom"
              >
                <template #activator="{ props }">
                  <v-icon
                    v-bind="props"
                    size="x-large"
                  >
                    mdi-account-group
                  </v-icon>
                </template>
              </v-tooltip>
            </v-tab>
            <v-tab value="gameLog">
              <v-tooltip
                text="Game Log"
                location="bottom"
              >
                <template #activator="{ props }">
                  <v-icon
                    v-bind="props"
                    size="x-large"
                  >
                    mdi-script-text-outline
                  </v-icon>
                </template>
              </v-tooltip>
            </v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <v-window-item value="nations">
              <NationComponent
                v-for="[nation] of imperial.instance.nations"
                :key="nation.value"
                :current-nation="imperial.instance.currentNation.value"
                :nation="nation.value"
                :treasury="imperial.instance.nations.get(nation).treasury"
                :can-pay-out="canPayOut(nation)"
                :power-points="imperial.instance.nations.get(nation).powerPoints"
                :controller="imperial.instance.nations.get(nation).controller"
                :current-player="user.displayName"
                :base-game="imperial.instance.baseGame"
                :winner="imperial.instance.winner"
              />
            </v-window-item>

            <v-window-item value="players">
              <GameDetails
                :game="imperial"
                :game-data="game"
                :user="user"
                :controlling-player-name="controllingPlayerName"
                :online-users="users"
                :paused="paused()"
                :hosting-this-game="hostingThisGame"
                @tick="tickWithAction"
                @toggle-trade-in="toggleTradeIn"
              />
            </v-window-item>

            <v-window-item value="gameLog">
              <GameLog
                :log="imperial.instance.annotatedLog"
                :log-timestamps="logTimestamps"
                :board="board"
              />
            </v-window-item>
          </v-window>
        </v-card>
        <v-card-text>
          <v-sheet
            v-if="
              game.baseGame === 'imperial' ||
                game.baseGame === 'imperialEurope2030' ||
                game.baseGame === 'imperialAsia'
            "
          >
            <v-row>
              <v-col cols="8">
                <Board
                  :config="boardConfig"
                  :game="imperial.instance"
                  :game-started="gameStarted"
                  :paused="paused()"
                  :user="user"
                  :province-with-fight="provinceWithFight"
                  :provinces-with-production="provincesWithProduction"
                  :select-province="selectProvince"
                  :units-to-import="importPlacements"
                  :valid-provinces="validProvinces"
                  @fight-resolved="resolveFight"
                  @production-resolved="resolveProduction"
                />
                <TimeTravelButtons
                  :game="imperial.instance"
                  :popped-turns="poppedTurns"
                  @back-to-game-start-event="backToGameStart"
                  @back-to-round-start-event="backToRoundStart"
                  @back-event="back"
                  @forward-event="forward"
                  @forward-to-current-action-event="forwardToCurrentAction"
                />
              </v-col>
              <v-col cols="4">
                <Rondel
                  v-if="
                    !imperial.winner"
                  :game="imperial.instance"
                  :name="user.displayName"
                  :paused="paused()"
                  :hosting-this-game="hostingThisGame"
                  @tick-with-action="tickWithAction"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <ControlPanel
                  :game="imperial.instance"
                  :choose-import-type="importProvince"
                  :controlling-player-name="controllingPlayerName"
                  :user="user"
                  :import-placements="importPlacements"
                  :game-data="game"
                  :traded-in-bond-nation="tradedInBondNation"
                  :traded-in-value="tradedInValue"
                  :paused="paused()"
                  :hosting-this-game="hostingThisGame"
                  @tick="tickWithAction"
                  @end-maneuver="endManeuver"
                  @choose-import-type="makeImportTypeChoice"
                  @run-import="runImport"
                  @skip-build-factory="skipBuildFactory"
                  @purchase-bond="purchaseBond"
                  @toggle-trade-in="toggleTradeIn"
                />
              </v-col>
            </v-row>
          </v-sheet>
          <v-sheet v-else>
            <v-row>
              <v-col>
                <Board
                  :config="boardConfig"
                  :game="imperial.instance"
                  :game-started="gameStarted"
                  :paused="paused()"
                  :user="user"
                  :province-with-fight="provinceWithFight"
                  :provinces-with-production="provincesWithProduction"
                  :select-province="selectProvince"
                  :units-to-import="importPlacements"
                  :valid-provinces="validProvinces"
                  @fight-resolved="resolveFight"
                  @production-resolved="resolveProduction"
                />
                <TimeTravelButtons
                  :game="imperial.instance"
                  :popped-turns="poppedTurns"
                  @back-to-game-start-event="backToGameStart"
                  @back-to-round-start-event="backToRoundStart"
                  @back-event="back"
                  @forward-event="forward"
                  @forward-to-current-action-event="forwardToCurrentAction"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <ControlPanel
                  :game="imperial.instance"
                  :choose-import-type="importProvince"
                  :controlling-player-name="controllingPlayerName"
                  :user="user"
                  :import-placements="importPlacements"
                  :game-data="game"
                  :traded-in-bond-nation="tradedInBondNation"
                  :traded-in-value="tradedInValue"
                  :paused="paused()"
                  :hosting-this-game="hostingThisGame"
                  @tick="tickWithAction"
                  @end-maneuver="endManeuver"
                  @choose-import-type="makeImportTypeChoice"
                  @run-import="runImport"
                  @skip-build-factory="skipBuildFactory"
                  @purchase-bond="purchaseBond"
                  @toggle-trade-in="toggleTradeIn"
                />
              </v-col>
            </v-row>
            <v-row>
              <Rondel
                v-if="!imperial.instance.winner"
                :game="imperial.instance"
                :name="user.displayName"
                :paused="paused()"
                :hosting-this-game="hostingThisGame"
                @tick-with-action="tickWithAction"
              />
            </v-row>
          </v-sheet>
          <div v-if="game.winner">
            <NationControlChart :game="imperial" />
          </div>
        </v-card-text>
      </v-card>
    </v-sheet>
    <div v-else-if="game.cancelledAt">
      This game was cancelled by the host
    </div>
    <div v-else>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <Board
                :config="boardConfig"
                :game="game"
                :game-started="gameStarted"
                :paused="paused()"
                :user="user"
                :province-with-fight="provinceWithFight"
                :provinces-with-production="provincesWithProduction"
                :select-province="selectProvince"
                :units-to-import="importPlacements"
                :valid-provinces="validProvinces"
                @fight-resolved="resolveFight"
                @production-resolved="resolveProduction"
              />
            </v-col>
            <v-col align-self="center">
              <div v-if="hostingThisGame">
                <p>
                  <b>Players:</b>
                  <span>{{ playersInGame.join(", ") }}</span>
                </p>
                <p>
                  <b>Base game:</b>
                  <span>{{ baseGameString(game.baseGame) }}</span>
                </p>
                <p>
                  <b>Variant:</b>
                  <span>{{ variant(game.variant) }}</span>
                </p>
                <v-btn
                  v-if="playersInGame.length === 1"
                  color="primary-darken-1"
                  class="mt-2"
                  block
                  @click="startGame(game, gameRef)"
                >
                  Start Solo Game (sandbox mode)
                </v-btn>
                <v-btn
                  v-else
                  color="primary-darken-1"
                  block
                  @click="startGame(game, gameRef)"
                >
                  Start Game
                </v-btn>
                <v-btn
                  color="error"
                  class="mt-2"
                  block
                  @click="cancelGame"
                >
                  Cancel Game
                </v-btn>
                <v-btn
                  v-for="player in otherPlayersInGame"
                  :key="player"
                  color="error"
                  block
                  @click="boot(player)"
                >
                  Boot {{ player }}
                </v-btn>
              </div>
              <div v-else-if="playingInThisGame">
                <p>
                  <b>Players:</b>
                  <span>{{ playersInGame.join(", ") }}</span>
                </p>
                <p>
                  <b>Base game:</b>
                  <span>{{ baseGameString(game.baseGame) }}</span>
                </p>
                <p>
                  <b>Variant:</b>
                  <span>{{ variant(game.variant) }}</span>
                </p>
                <div class="text-2xl m-2">
                  Game not yet started!
                </div>
                <v-btn
                  color="error"
                  block
                  @click="leaveGame(user.displayName)"
                >
                  Leave Game
                </v-btn>
              </div>
              <div v-else-if="!joinedGame">
                <div class="mx-auto p-2 text-center">
                  <p>
                    <b>Players:</b>
                    <span>{{ playersInGame.join(", ") }}</span>
                  </p>
                  <p>
                    <b>Base game:</b>
                    <span>{{ baseGameString(game.baseGame) }}</span>
                  </p>
                  <p>
                    <b>Variant:</b>
                    <span>{{ variant(game.variant) }}</span>
                  </p>
                </div>
                <v-btn
                  v-if="playersInGame.length < 6"
                  color="primary-darken-1"
                  block
                  @click="joinGame"
                >
                  Join This Game
                </v-btn>
                <div
                  v-else
                  class="mx-auto p-2 text-center"
                >
                  <b>Game is full but not yet started!</b>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-sheet>
</template>

<script setup>
import { Howl } from 'howler';
import ImperialGameCoordinator from '../../Domain/ImperialGameCoordinator';
import Action from '../../Domain/action';

import Logger from '../Logger';

import Board from '../components/Board.vue';
import ControlPanel from '../components/ControlPanel.vue';
import GameDetails from '../components/GameDetails.vue';
import GameLog from '../components/GameLog.vue';
import NationControlChart from '../components/NationControlChart.vue';
import NationComponent from '../components/NationComponent.vue';
import Rondel from '../components/Rondel.vue';
import Rules from '../components/Rules.vue';
import TimeTravelButtons from '../components/TimeTravelButtons.vue';
import TurnStatus from '../components/TurnStatus.vue';

import getGameLog from '../getGameLog';
import setFavicon from '../setFavicon';

import startGame from '../lib/startGame';
import { Nation, Nation2030 } from '../../Domain/constants';
import notification from '../assets/notification.mp3';
import { getDoc, getFirestore, doc, updateDoc, setDoc, onSnapshot, addDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import saveGameStateSnapshot from '~/lib/saveGameStateSnapshot';
import getBoard from '~/lib/getBoard';
import translateToGameData from '~/translateToGameData';
import anonymityConfirmed from '~/lib/anonymityConfirmed';

const route = useRoute();
const router = useRouter();
const db = getFirestore();
const props = defineProps({
  user: { type: Object, default: () => {} },
  env: { type: String, default: '' },
  games: { type: Array, default: () => [] },
  lovelyString: { type: String, default: '' },
  observers: { type: Array, default: () => [] },
  users: { type: Array, default: () => [] },
});

// Firebase variables
const gameRef = doc(db, 'games', route.params.id)
let gameSnap = await getDoc(gameRef);
const actionsCollection = collection(db, 'games', route.params.id, 'actions')
let actionsSnap;
let actionsQuery;

const joinedGame = ref(false);
const playingInThisGame = ref(false);
let game = {};
let actions = [];
const logTimestamps = [];
let gameLog;

const audioNotification = () => {
  if (props.user && props.user.displayName === imperial.value.instance?.currentPlayerName && !silenceAudio) {
    new Howl({ src: [notification] }).play();
  }
};

const maneuverOrigin = ref('');
const getValidProvinces = () => {
  // This function returns all provinces that a unit can move
  // or be imported to.
  const provinces = new Set();

  if (imperial.value.instance.currentPlayerName === props.user.displayName || (imperial.value.instance.soloMode && hostingThisGame)) {
    for (const action of imperial.value.instance.availableActions) {
      if (action.type === 'maneuver' && imperial.value.instance.maneuvering) {
        if (maneuverOrigin.value === action.payload.origin) {
          provinces.add(action.payload.destination);
        } else if (!maneuverOrigin.value) {
          provinces.add(action.payload.origin);
        }
      } else if (action.type === 'import' && imperial.value.instance.importing) {
        action.payload.placements.forEach((placement) => {
          provinces.add(placement.province);
        });
      } else if (action.type === 'buildFactory' && imperial.value.instance.buildingFactory) {
        provinces.add(action.payload.province);
      }
    }
  }

  validProvinces.value = Array.from(provinces);
};

let gameStarted = ref(false);
let currentPlayer = ref({});
let controllingPlayerName = ref('');
let hostingThisGame = ref(false);
const validProvinces = ref([]);

game.baseGame = gameSnap.get('baseGame');
const { boardConfig, board } = getBoard(game.baseGame);
const imperial = ref({ instance: null });
const playersInGame = ref([]);

const setUpBoard = async () => {
  gameSnap = await getDoc(gameRef);
  if (gameSnap.get('cancelledAt')) {
    router.push('/');
  }

  // Fetch actions for the game log
  actionsQuery = await query(actionsCollection, orderBy('timestamp'));
  actionsSnap = await getDocs(actionsQuery);
  actions = [];
  actionsSnap.forEach((doc) => {
    actions.push(doc.data().action);
    logTimestamps.push(doc.data().timestamp)
  })

  game.id = route.params.id;
  // game.baseGame = gameSnap.get('baseGame');
  game.name = gameSnap.get('name');
  game.host = gameSnap.get('host');
  game.players = gameSnap.get('players');
  game.state = gameSnap.get('state');
  playersInGame.value = game.players.map((p) => p.name);
  hostingThisGame = game.host === props.user?.displayName;

  game.variant = gameSnap.get('variant');
  game.players = gameSnap.get('players');

  for (const player of playersInGame.value) {
    if (player === props.user?.displayName) {
      playingInThisGame.value = true;
    }
  }

  // Game has begun
  if (actions.length > 0) {
    const newImperial = new ImperialGameCoordinator(board, new Logger('dev', game.id));
    gameLog = getGameLog(actions, game.baseGame);
    newImperial.tickFromLog(gameLog);
    currentPlayer.value = newImperial.players[props.user.displayName];
    controllingPlayerName.value = newImperial.currentPlayerName;
    imperial.value.instance = newImperial;
    gameStarted.value = true;
    getValidProvinces();
  }
  setFavicon(props.games, props.user, game.id);
}

await setUpBoard();
audioNotification();
useHead({
  title: game.name + ' - Imperial',
});

const rulesDialogFromSidebar = ref(false);
const rulesDialog = ref(false);
const poppedTurns = ref([]);
let provinceWithFight = ref('');
let provincesWithProduction = ref([]);
const importPlacements = ref([]);

const tab = ref(null);
const tradedInValue = ref(0);
const tradedInBondNation = ref('');
const importProvince = ref('');

const gameUnsub = onSnapshot(gameRef, () => {
  setUpBoard();
});

const actionsUnsub = onSnapshot(actionsCollection, async () => {
  setUpBoard();
})

// if (
//   oldPlayerName !== this.game.currentPlayerName
//   && (oldPlayerName === this.profile.username || (
//     !oldPlayerName && this.game.currentPlayerName
//   ))
// ) {
//   // apiClient.notifyNextPlayer(this.$route.params.id, this.game.currentPlayerName);
// }

      // // apiClient.updateCurrentPlayerName(this.$route.params.id, this.game.currentPlayerName);
      // if (this.game.winner) {
      //   const scores = {};
      //   for (const name in this.game.players) {
      //     scores[name] = this.game.players[name].rawScore + this.game.players[name].cash;
      //   }
      //   // apiClient.updateWinner(this.$route.params.id, this.game.winner, scores);
      // }

// First time user is playing a solo game
if (route.query.solo) {
  await startGame(game, gameRef);
  await setUpBoard();
}

router.replace({ query: null });

const silenceAudio = false;

const paused = () => {
  if (poppedTurns.value.length > 0) {
    return true;
  }

  return false;
};
  // },
  // created() {
  //   // apiClient.getGameLog(this.$route.params.id);
  //   // window.addEventListener('beforeunload', this.beforeWindowUnload);
  //   // apiClient.userObservingGame(this.profile.username, this.$route.params.id);
  //   setFavicon(this.games, this.profile, this.$route.params.id);
  // },
  // updated() {
  //   this.getBoardConfig();
  //   document.title = `${this.game.name} - Imperial`;
  // },
  // beforeUnmount() {
  //   // window.removeEventListener('beforeunload', this.beforeWindowUnload);
  //   setFavicon(this.games, this.profile, '');
  // },

  // methods: {
  //   getBoardConfig() {
  //     if (this.game.baseGame === 'imperial' || this.game.baseGame === 'imperialEurope2030') {
  //       import('../boardConfigs').then((resp) => { this.boardConfig = resp.default.imperial; });
  //     } else if (this.game.baseGame === 'imperial2030') {
  //       import('../board2030Configs').then((resp) => { this.boardConfig = resp.default.imperial2030; });
  //     } else if (this.game.baseGame === 'imperialAsia') {
  //       import('../boardAsiaConfigs').then((resp) => { this.boardConfig = resp.default.imperialAsia; });
  //     }
  //   },
  //   // beforeWindowUnload() {
  //   //   apiClient.userStoppedObservingGame(this.profile.username, this.$route.params.id);
  //   // },

const otherPlayersInGame = () => {
  return playersInGame.value.filter((player) => player !== props.user.displayName);
};

const joinGame = async () => {
  let user = props.user;
  if (!user) {
    user = await anonymityConfirmed(props.lovelyString);
  }
  joinedGame.value = true;
  const gameSnap = await getDoc(gameRef);
  const players = gameSnap.data().players
  players.push({ name: user.displayName, id: user.uid });
  await updateDoc(gameRef, { players })
};

const cancelGame = async () => {
  await updateDoc(gameRef, {
    cancelledAt: Date.now(),
  });
  router.push('/');
};

const boot = async (playerName) => {
  const gameSnap = await getDoc(gameRef);
  const players = gameSnap.data().players.filter((player) => player.name !== playerName);
  await updateDoc(gameRef, { players })
};

const leaveGame = async (playerName) => {
  await boot(playerName);
  router.push('/');
};

const tickWithAction = async (action) => {
  controllingPlayerName.value = imperial.value.instance.currentPlayerName;
  if (!paused()) {
    displayFight(action);
    displayProduction(action);
    const cleanAction = JSON.parse(JSON.stringify(action));
    await addDoc(collection(db, 'games', route.params.id, 'actions'), {
      action: cleanAction,
      timestamp: Date.now(),
    })
    const newLog = [...imperial.value.instance.log];
    const newImperial = new ImperialGameCoordinator(board, game.id);
    newImperial.tickFromLog(newLog);
    await updateDoc(gameRef, {
      currentPlayerName: newImperial.currentPlayerName,
    });
    await saveGameStateSnapshot({
      state: newImperial.toJSON(),
      availableActions: JSON.parse(JSON.stringify(newImperial.availableActions)),
      log: JSON.parse(JSON.stringify(newImperial.log)),
      action: JSON.parse(JSON.stringify(action)),
      id: route.params.id,
    });
  }
};

const selectProvince = (inputProvince) => {
  const province = inputProvince.replace(/\.*\s/gm, '').toLowerCase();
  let provinceIsValid = false;
  for (const validProvince of validProvinces.value) {
    if (validProvince === province) {
      provinceIsValid = true;
      break;
    }
  }

  if (!provinceIsValid) {
    maneuverOrigin.value = '';
    return;
  }

  if (
    imperial.value.instance.currentPlayerName === props.user.displayName
    || (imperial.value.instance.soloMode && hostingThisGame)
  ) {
    // If the game is in a maneuver and an origin is specified,
    // then the next specified province is the destination
    if (imperial.value.instance.maneuvering && maneuverOrigin.value) {
      const maneuver = Action.maneuver({
        origin: maneuverOrigin.value,
        destination: province,
      });
      // Reset maneuverStatus
      maneuverOrigin.value = '';
      tickWithAction(maneuver);
      // If the game is in a maneuver with no origin specified,
      // then the next specified province is the origin
    } else if (imperial.value.instance.maneuvering) {
      maneuverOrigin.value = province;
      getValidProvinces();
      // If the game is in an import, then each specified province
      // gets added to the placements.
    } else if (imperial.value.instance.importing) {
      if (imperial.value.instance.board.graph.get(province).factoryType === 'shipyard') {
        importProvince.value = province;
      } else {
        importPlacements.push({ province, type: 'army', nation: imperial.value.instance.currentNation.value });
      }
      if (importPlacements.length === imperial.value.instance.maxImports) {
        runImport();
      }
    } else if (imperial.value.instance.buildingFactory) {
      for (const action of imperial.value.instance.availableActions) {
        if (action.payload.province === province) {
          tickWithAction(action);
        }
      }
    }
  }
};

const displayFight = (action) => {
  if (action.type === 'fight') {
    provinceWithFight = action.payload.province;
  }
};

const resolveFight = () => {
  provinceWithFight = '';
};

const displayProduction = (action) => {
  if (
    action.type === 'rondel' && (action.payload.slot === 'production1' || action.payload.slot === 'production2')
  ) {
    const out = [];
    const homeProvinces = imperial.value.instance.board.byNation.get(action.payload.nation);
    for (const homeProvince of homeProvinces) {
      const provinceIsOccupied = imperial.value.instance.provinceIsOccupied(homeProvince, action.payload.nation);
      if (imperial.value.instance.provinces.get(homeProvince).factory && !provinceIsOccupied) {
        out.push(homeProvince);
      }
    }
    provincesWithProduction = out;
  }
};

const resolveProduction = () => {
  provincesWithProduction = [];
};

const makeImportTypeChoice = (type) => {
  this.importPlacements.push(
    { province: this.importProvince, type, nation: this.game.currentNation.value },
  );
  this.importProvince = '';
  if (this.importPlacements.length === this.game.maxImports) {
    this.runImport();
  }
};

const runImport = () => {
  const placements = this.importPlacements;
  placements.forEach((placement) => delete placement.nation);
  this.tickWithAction(Action.import({ placements }));
  this.importPlacements = [];
};

const skipBuildFactory = () => {
  for (const action of this.game.availableActions) {
    if (action.type === 'skipBuildFactory') {
      this.tickWithAction(action);
    }
  }
};

const endManeuver = () => {
  tickWithAction(Action.endManeuver());
  maneuverOrigin = '';
};

const back = () => {
  const lastTurn = imperial.value.instance.log.pop();
  poppedTurns.value.push(lastTurn);
  let lastMoveType = imperial.value.instance.log[imperial.value.instance.log.length - 1].type;

  while ((lastMoveType !== 'rondel' && lastMoveType !== 'initialize') || lastMoveType === 'endGame') {
    poppedTurns.value.push(imperial.value.instance.log.pop());
    lastMoveType = imperial.value.instance.log[imperial.value.instance.log.length - 1].type;
  }

  const { log } = imperial.value.instance;
  const { baseGame } = game;

  imperial.value.instance = markRaw(new ImperialGameCoordinator(board, new Logger('replay', imperial.value.instance.id)));
  if (baseGame) {
    imperial.value.instance.baseGame = baseGame;
  }
  imperial.value.instance.tickFromLog(log);
};

const backToRoundStart = () => {
  const startingNation = (game.baseGame === 'imperial' || game.baseGame === 'imperialEurope2030')
    ? Nation.AH : Nation2030.RU;
  while ((imperial.value.instance.log[imperial.value.instance.log.length - 1].payload.nation !== startingNation)
    || (imperial.value.instance.log[imperial.value.instance.log.length - 1].type !== 'rondel')) {
    back();
  }

  // Go back to beginning of startingNation's turn, one more
  const lastTurn = imperial.value.instance.log.pop();
  poppedTurns.value.push(lastTurn);

  const { log } = imperial.value.instance;
  const { baseGame } = game;

  imperial.value.instance = markRaw(new ImperialGameCoordinator(board, new Logger('replay', imperial.value.instance.id)));
  if (baseGame) {
    imperial.value.instance.baseGame = baseGame;
  }
  imperial.value.instance.tickFromLog(log);
};

const backToGameStart = () => {
  while (imperial.value.instance.log[imperial.value.instance.log.length - 1].type !== 'initialize') {
    back();
  }
};

const forward = () => {
  const newLog = imperial.value.instance.log;
  newLog.push(poppedTurns.value.pop());
  while (poppedTurns[poppedTurns.length - 1]?.type === 'maneuver') {
    newLog.push(poppedTurns.value.pop());
  }
  const { baseGame } = imperial.value.instance;

  imperial.value.instance = markRaw(new ImperialGameCoordinator(board, new Logger('replay', imperial.value.instance.id)));
  if (baseGame) {
    imperial.value.instance.baseGame = baseGame;
  }
  imperial.value.instance.tickFromLog(newLog);
};

const forwardToCurrentAction = () => {
  while (poppedTurns.value.length > 0) {
    forward();
  }
};

  //   // mapWidth() {
  //   //   if (this.game.baseGame === 'imperial' || this.game.baseGame === 'imperialAsia') {
  //   //     return 'w-full sm:w-7/12';
  //   //   } if (this.game.baseGame === 'imperial2030') {
  //   //     return 'w-full';
  //   //   }

  //   //   return '';
  //   // },
  //   // gameDetailsWidth() {
  //   //   if (this.game.baseGame === 'imperial' || this.game.baseGame === 'imperialAsia') {
  //   //     return 'w-full sm:w-1/3';
  //   //   } if (this.game.baseGame === 'imperial2030') {
  //   //     return 'w-full';
  //   //   }

  //   //   return '';
  //   // },
const baseGameString = (baseGame) => {
  switch (baseGame) {
    case 'imperial': return 'Imperial (Classic)';
    case 'imperialEurope2030': return 'Imperial (2030 Rules)';
    case 'imperial2030': return 'Imperial 2030';
    case 'imperialAsia': return 'Imperial Asia';
    default: return 'Imperial (Classic)';
  }
};
const variant = (variant) => {
  if (variant === 'standard') {
    return 'Standard (with investor card, no auction)';
  } if (variant === 'auction') {
    return 'Auction (with investor card and auction)';
  } if (variant === 'withoutInvestorCard') {
    return 'Without Investor Card (with auction, no investor card)';
  }
  return '';
};

const cloneGame = () => {
  // fetch(
  //   '/clone_games',
  //   {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       id: this.$route.params.id,
  //       host_id: this.profile.id,
  //       log: this.game.log,
  //     }),
  //     headers: { 'Content-Type': 'application/json' },
  //   },
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     this.$emit('receivegame', data);
  //     // apiClient.getGameLog(data.id, this.game.baseGame);
  //     this.$router.push(`/game/${data.id}`);
  //   });
};

const goToSourceGame = () => {
  const id = this.game.clonedFromGame;
  // apiClient.getGameLog(id, this.game.baseGame);
  this.$router.push(`/game/${id}`);
};

const canPayOut = (nation) => {
  let totalToPayOut = 0;
  for (const player in imperial.value.instance.players) {
    for (const bond of imperial.value.instance.players[player].bonds) {
      if (bond.nation === nation) {
        totalToPayOut += bond.number;
      }
    }
  }

  return imperial.value.instance.nations.get(nation).treasury >= totalToPayOut;
};

const toggleTradeIn = (bond) => {
  if (tradedInValue.value > 0) {
    tradedInBondNationValue = '';
    tradedInValue.value = 0;
  } else {
    tradedInBondNation = bond.nation.value;
    tradedInValue.value = bond.cost;
  }
};

const purchaseBond = (bond) => {
  for (const action of imperial.value.instance.availableActions) {
    if (
      bond.cost === action.payload.cost
      && bond.nation.value === action.payload.nation.value
      && action.payload.tradeInValue === tradedInValue.value
    ) {
      tickWithAction(action);
      tradedInValue.value = 0;
    }
  }
};
</script>

<style>
  .hoverable {
    stroke-width: 0.5px;
    filter: brightness(0.7);
  }

  .hoverable:hover {
    filter: url(#brightness);
  }

  .tooltip .tooltip-text {
    visibility: hidden;
    position: absolute;
    z-index: 100;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
  }
</style>