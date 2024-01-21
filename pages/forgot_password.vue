<template>
  <v-container>
    <v-sheet
      width="300"
      class="mx-auto"
    >
      <div v-if="passwordResetEmailSent">
        Check your email (and your spam folder).
      </div>
      <v-form
        v-else
        @submit.prevent="submitForgotPassword"
      >
        <v-container>
          <v-row>
            <v-text-field
              v-model="email"
              label="Email"
              required
            />
          </v-row>
          <v-row>
            <v-btn
              type="submit"
              block
            >
              {{ passwordResetEmailRequested ? 'Sending you an email...' : 'Get password reset link' }}
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      errors: [],
      passwordResetEmailRequested: false,
      passwordResetEmailSent: false,
    };
  },
  head() {
    return {
      title: 'Forgot Password - Imperial'
    }
  },
  methods: {
    submitForgotPassword() {
      this.passwordResetEmailRequested = true;
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.email).then(() => {
        this.passwordResetEmailSent = true;
      }).catch((errors) => {
        this.errors = errors;
      })
    },
  },
};
</script>
