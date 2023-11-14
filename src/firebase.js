import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9ZoOIT9y3uvJiqGZH_EhoIkdPBXxkvE0",
  authDomain: "music-db-19482.firebaseapp.com",
  projectId: "music-db-19482",
  storageBucket: "music-db-19482.appspot.com",
  messagingSenderId: "849732332850",
  appId: "1:849732332850:web:0dfd2e073514de662c7b2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);