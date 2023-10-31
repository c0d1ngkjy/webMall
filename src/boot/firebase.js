import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVfB2elolAmWNpBuJJ9BsOwz1haxfhqqU",
  authDomain: "webmallschool.firebaseapp.com",
  projectId: "webmallschool",
  storageBucket: "webmallschool.appspot.com",
  messagingSenderId: "704894350992",
  appId: "1:704894350992:web:a7a76b593879cd06df0a15",
  measurementId: "G-GZKQ0GZETX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

