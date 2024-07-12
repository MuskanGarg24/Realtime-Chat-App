import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { updateUser } from "./users";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Error creating user:", error);
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Error signing in:", error);
  }
};

export const doSignOut = () => {
  updateUser(auth.currentUser.uid, false);
  return auth.signOut();
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}`,
  });
};
