import { addDoc, collection, getFirestore } from "firebase/firestore";

export default async ({ state, availableActions = [], log = [], action = {}, id }) => {
  const db = getFirestore();
  await addDoc(collection(db, 'games', id, 'snapshots'), {
    state,
    availableActions,
    log,
    action,
    timestamp: Date.now(),
  });
};