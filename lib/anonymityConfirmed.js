import { getAuth, signInAnonymously } from "firebase/auth";
import { updateCurrentUserProfile } from "vuefire";
import { faker } from "@faker-js/faker";

export default async (name) => {
  const auth = getAuth();
  const displayName = name || faker.person.firstName() + " the " + faker.animal.dog();
  const { user } = await signInAnonymously(auth);
  const uid = user.uid;
  await updateCurrentUserProfile({ displayName });
  return  { displayName, uid };
};