import Rebase from "re-base";
import firebase from "firebase";
import firebaseConfig from "./config/firebase-config";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
