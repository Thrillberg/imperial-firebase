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
      <v-form @submit.prevent="signIn">
        <v-container>
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
              Sign In
            </v-btn>
          </v-row>
          <v-row>
            <v-btn
              to="/forgot_password"
              class="mt-2"
              block
            >
              Forgot your password?
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
  name: 'SignIn',
  emits: ['signedIn'],
  data() {
    return {
      email: '',
      errors: [],
      password: '',
    };
  },
  head() {
    return {
      title: 'Sign In - Imperial'
    }
  },
  methods: {
    async signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password).then((userCrediential) => {
        this.$emit('signedIn')
        this.$router.push('/');
      }).catch((errors) => {
        this.errors = errors
      })
    },
  },
};
</script>
