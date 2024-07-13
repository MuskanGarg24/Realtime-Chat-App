import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { updateUser } from "./users";

// Sign Up
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Error creating user:", error);
  }
};


// Sign In
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log("Error signing in:", error);
  }
};


// Sign Out
export const doSignOut = () => {
  updateUser(auth.currentUser.uid, false);
  return auth.signOut();
};


// Send Email Verification
export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}`,
  });
};
