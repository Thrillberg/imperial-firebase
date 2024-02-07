import { collection, doc, getDocs, getFirestore, query, updateDoc } from "firebase/firestore";

export default async (displayName, oldDisplayName) => {
  // This updates games and actions but NOT snapshots... yet.
  const db = getFirestore();
  const gamesSnap = await getDocs(query(collection(db, 'games')));
  gamesSnap.forEach(async (gameSnap) => {
    const game = gameSnap.data();
    const gameRef = doc(db, 'games', gameSnap.id);
    if (game.host === oldDisplayName) {
      await updateDoc(gameRef, {
        host: displayName,
      });
    };

    const players = game.players;
    const playerIndex = players.findIndex(p => p.id === oldDisplayName);
    if (players[playerIndex]) {
      const player = Object.assign({}, players[playerIndex], { id: displayName });
      players[playerIndex] = player;
      await updateDoc(gameRef, { players });

      const actionsCollection = await getDocs(query(collection(db, 'games', gameSnap.id, 'actions')));
      actionsCollection.forEach(async (actionSnap) => {
        const { action } = actionSnap.data();
        const actionRef = doc(db, 'games', gameSnap.id, 'actions', actionSnap.id);
        if (action.type === 'initialize') {
          const initPlayers = action.payload.players;
          const initPlayerIndex = initPlayers.findIndex(p => p.id === oldDisplayName);
          const player = Object.assign({}, initPlayers[initPlayerIndex], { id: displayName });
          initPlayers[initPlayerIndex] = player;
          debugger
          const newPayload = Object.assign({}, action.payload, { players: initPlayers });
          const newAction = Object.assign({}, action, { payload: newPayload });
          await updateDoc(actionRef, { action: newAction });
        }
      });
    };
  });
};