import { addDoc, collection, getFirestore, updateDoc } from 'firebase/firestore';
import assignNations from '../assignNations';
import Action from '~/Domain/action';

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
  await updateDoc(gameRef, {
    players: game.players,
    soloMode: game.soloMode,
    startedAt: Date.now(),
  });
  await addDoc(collection(db, 'games', route.params.id, 'actions'), {
    action: JSON.parse(JSON.stringify(action)),
    timestamp: Date.now(),
  })
};