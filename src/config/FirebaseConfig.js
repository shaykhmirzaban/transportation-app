import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCziGGp-0hOrLdOfKMkwIW86XYXFafHBGg",
  authDomain: "transportation-app-164f8.firebaseapp.com",
  databaseURL: "https://transportation-app-164f8-default-rtdb.firebaseio.com",
  projectId: "transportation-app-164f8",
  storageBucket: "transportation-app-164f8.appspot.com",
  messagingSenderId: "221359494920",
  appId: "1:221359494920:web:c59e5e4d338371643f3ebd",
  measurementId: "G-PFFL3GRWDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;