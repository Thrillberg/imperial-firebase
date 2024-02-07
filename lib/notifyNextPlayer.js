import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default async ({
  oldPlayerName,
  newImperial,
  user,
  db,
  route,
  game,
}) => {
  const newPlayerName = newImperial.currentPlayerName;
  if (
    oldPlayerName !== newPlayerName
    && (oldPlayerName === user.displayName || (
      !oldPlayerName && newPlayerName
    ))
  ) {
    const actionsCollection = collection(db, 'games', route.params.id, 'actions')
    const actionsQuery = await query(actionsCollection, orderBy('timestamp'));
    const actionsSnap = await getDocs(actionsQuery);
    let lastAction;
    actionsSnap.forEach((doc) => {
      lastAction = doc.data().action;
    });

    if (!newImperial.winner && !lastAction.playerNotifiedAt && !game.clonedFromGame) {
      // debugger
      // const newPlayerUser = collection(db, 'userSettings', user.uid);
    }
    // apiClient.notifyNextPlayer(this.$route.params.id, this.game.currentPlayerName);
  }
}