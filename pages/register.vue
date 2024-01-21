<template>
  <v-container>
    <v-sheet
      width="300"
      class="mx-auto"
    >
      <div
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
      </div>
      <v-form @submit.prevent="register">
        <v-container>
          <v-row>
            <v-text-field
              v-model="username"
              label="Username"
              required
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="email"
              label="Email"
              required
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            />
          </v-row>
          <v-row>
            <v-btn
              type="submit"
              block
            >
              Register
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup>
import { createUserWithEmailAndPassword, EmailAuthProvider, getAuth, linkWithCredential } from "firebase/auth";
import { updateCurrentUserProfile } from "vuefire";
import { setDoc, doc, getFirestore } from 'firebase/firestore';

const emits = defineEmits(['registered']);

const auth = getAuth();
const db = getFirestore();
const router = useRouter();
const errors = [];
const username = ref('');
const password = ref('');
const email = ref('');
useHead({
  title: 'Register - Imperial',
});
const register = async () => {
  const credential = EmailAuthProvider.credential(email.value, password.value);
  if (auth.currentUser) {
    await linkWithCredential(auth.currentUser, credential)
    await updateCurrentUserProfile({ displayName: username.value })
  } else {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
  }
  await setDoc(doc(db, 'userSettings', auth.currentUser.uid), {
    discordId: '',
    turnNotificationsEnabled: false,
  });
  router.push('/');
};
</script>