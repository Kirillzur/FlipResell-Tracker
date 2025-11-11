import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:
    (import.meta.env.VITE_FIREBASE_API_KEY as string) ||
    'AIzaSyCs4iZW1zh947i_DGj2zlKUvqQI8k9CXWE',
  authDomain:
    (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string) ||
    'flipresell-tracker.firebaseapp.com',
  projectId:
    (import.meta.env.VITE_FIREBASE_PROJECT_ID as string) ||
    'flipresell-tracker',
  storageBucket:
    (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string) ||
    // Typical bucket domain; safe if you use Storage later
    'flipresell-tracker.appspot.com',
  messagingSenderId:
    (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string) ||
    '1020661635748',
  appId:
    (import.meta.env.VITE_FIREBASE_APP_ID as string) ||
    '1:1020661635748:web:f980c9e32bc109c428a431',
  // Optional RTDB URL support
  databaseURL:
    (import.meta.env.VITE_FIREBASE_DATABASE_URL as string) ||
    'https://flipresell-tracker-default-rtdb.europe-west1.firebasedatabase.app',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// Helpful warning if env is not configured
if (!import.meta.env.VITE_FIREBASE_API_KEY || !import.meta.env.VITE_FIREBASE_PROJECT_ID) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Firebase] Missing env config. Ensure .env.local has VITE_FIREBASE_* variables.'
  );
}
