// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDDSnXhojcYJGmrSag_AuBgKbRylTJIHr4',
  authDomain: 'myinsta-8d2c0.firebaseapp.com',
  projectId: 'myinsta-8d2c0',
  storageBucket: 'myinsta-8d2c0.appspot.com',
  messagingSenderId: '592821649461',
  appId: '1:592821649461:web:66bd8ac167fb079ec3717c',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
