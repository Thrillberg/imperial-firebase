import { addDoc, collection, getFirestore, updateDoc } from 'firebase/firestore';
import assignNations from '../assignNations';
import Action from '~/Domain/action';
import ImperialGameCoordinator from '~/Domain/ImperialGameCoordinator';
import getBoard from './getBoard';
import saveGameStateSnapshot from './saveGameStateSnapshot';

const shuffle = (players) => {
  let currentIndex = players.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = players[currentIndex];
    players[currentIndex] = players[randomIndex];
    players[randomIndex] = temporaryValue;
  }

  return players.map((player) => ({ id: player }));
};

export default async (game, gameRef) => {
  const db = getFirestore();
  const route = useRoute();
  let playerNames;
  if (game.players.length === 1) {
    game.soloMode = true;
    game.players.push(
      { name: 'Charles' },
      { name: 'Louis' },
      { name: 'Otto' },
      { name: 'Henry' },
      { name: 'Conrad' },
    );
  } else {
    game.soloMode = false;
  }
  playerNames = game.players.map((player) => player.name);
  let players = shuffle(playerNames);
  const { baseGame, variant, soloMode } = game;
  if (variant === 'standard') {
    players = assignNations(players, baseGame);
  }
  const action = Action.initialize({
    players, soloMode, variant, baseGame,
  });
  const { board } = getBoard(baseGame);
  const newImperial = new ImperialGameCoordinator(board, route.params.id);
  newImperial.tick(action);
  await updateDoc(gameRef, {
    players: JSON.parse(JSON.stringify(players)),
    soloMode: game.soloMode,
    currentPlayerName: newImperial.currentPlayerName,
    startedAt: Date.now(),
  });
  await addDoc(collection(db, 'games', route.params.id, 'actions'), {
    action: JSON.parse(JSON.stringify(action)),
    timestamp: Date.now(),
  });
  await saveGameStateSnapshot({
    state: newImperial.toJSON(),
    availableActions: JSON.parse(JSON.stringify(newImperial.availableActions)),
    log: JSON.parse(JSON.stringify(newImperial.log)),
    action: JSON.parse(JSON.stringify(action)),
    id: route.params.id,
  });
};