import {
  type Analytics,
  initializeAnalytics,
  isSupported,
} from 'firebase/analytics'

export default defineNuxtPlugin(async () => {
  const firebaseApp = useFirebaseApp()

  let analytics: Analytics | null = null
  if (await isSupported()) {
    analytics = initializeAnalytics(firebaseApp)
  }

  return {
    provide: {
      analytics,
    },
  }
})