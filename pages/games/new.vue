<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-text>
        <v-form @submit.prevent="openGame">
          <b>Which base game?</b>
          <v-radio-group v-model="baseGame">
            <v-row align="center">
              <v-col>
                <Board
                  :config="boardConfigs.imperial"
                  :game="defaultLatestState('imperial')"
                />
                <v-radio
                  label="Imperial (Classic)"
                  value="imperial"
                />
                <v-radio
                  label="Imperial (2030 Rules)"
                  value="imperialEurope2030"
                />
              </v-col>
              <v-col>
                <Board
                  :config="boardConfigs.imperial2030"
                  :game="defaultLatestState('imperial')"
                />
                <v-radio
                  label="Imperial 2030"
                  value="imperial2030"
                />
              </v-col>
              <v-col>
                <Board
                  :config="boardConfigs.imperialAsia"
                  :game="defaultLatestState('imperial')"
                />
                <v-radio
                  label="Imperial Asia"
                  value="imperialAsia"
                />
              </v-col>
            </v-row>
          </v-radio-group>
          <b>Which variant?</b>
          <v-radio-group v-model="variant">
            <v-radio
              label="Standard (with investor card, no auction)"
              value="standard"
            />
            <v-radio
              label="Auction (with investor card and auction)"
              value="auction"
            />
            <v-radio
              label="Without Investor Card (with auction, no investor card)"
              value="withoutInvestorCard"
            />
          </v-radio-group>
          <b>Is your game public or private?</b>
          <div class="text-sm">
            Public games are listed on the Open Games list.
            Private games can only be joined with the game link.
          </div>
          <v-radio-group v-model="isPublic">
            <v-radio
              label="Public"
              :value="true"
            />
            <v-radio
              label="Private"
              :value="false"
            />
          </v-radio-group>
          <b>Do You Want a Discord Channel to Automatically be Created?</b>
          (Optional)
          <v-radio-group v-model="createDiscordChannel">
            <v-radio
              label="Yes"
              :value="true"
            />
            <v-radio
              label="No"
              :value="false"
            />
          </v-radio-group>
          <v-btn
            color="primary-darken-1"
            type="submit"
          >
            New Game
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import Board from '../../components/Board.vue';
import { defaultLatestState } from '../../translateToGameData';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import imperialBoardConfigs from '../imperialBoardConfigs';
import imperial2030BoardConfigs from '../imperial2030BoardConfigs';
import imperialAsiaBoardConfigs from '../imperialAsiaBoardConfigs';
import { faker } from '@faker-js/faker';

const boardConfigs = {
  imperial: imperialBoardConfigs,
  imperialEurope2030: imperialBoardConfigs,
  imperial2030: imperial2030BoardConfigs,
  imperialAsia: imperialAsiaBoardConfigs,
};

const props = defineProps({
  user: { type: Object, default: () => {} },
});
const router = useRouter();
const db = getFirestore();

const baseGame = ref('imperial');
const variant = ref('standard');
const isPublic = ref(true);
const createDiscordChannel = ref(false);

useHead({
  title: 'New Game - Imperial',
});

const openGame = async () => {
  const lovelyString = faker.word.adjective() + ' ' + faker.word.noun();
  const gameRef = await addDoc(collection(db, "games"), {
    name: lovelyString,
    host: props.user.displayName,
    baseGame: baseGame.value,
    variant: variant.value,
    isPublic: isPublic.value,
    players: [{ name: props.user.displayName, id: props.user.uid }],
    createdAt: new Date(),
  });

  if (createDiscordChannel.value) {
    // Do some Discord stuff here
  }
  router.push(`/games/${gameRef.id}`);
};
</script>
