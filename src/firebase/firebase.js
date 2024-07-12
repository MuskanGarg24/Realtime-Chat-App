import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiQsP2xdm1xD0tSB-OZmN1F8qYiZs-Pis",
  authDomain: "realtime-chat-app-8c3df.firebaseapp.com",
  databaseUrl: "https://realtime-chat-app-8c3df.firebaseio.com",
  projectId: "realtime-chat-app-8c3df",
  storageBucket: "realtime-chat-app-8c3df.appspot.com",
  messagingSenderId: "49993470784",
  appId: "1:49993470784:web:1c24b040c5a43d70b560a5",
  measurementId: "G-KR5TMNW76R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
