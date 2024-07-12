import { database } from "./firebase";
import { ref, set, get, child } from "firebase/database";

export const createUser = (userId, name, email) => {
  set(ref(database, "users/" + userId), {
    id: userId,
    name: name,
    email: email,
  });
};

export const readUser = (userId) => {
  return get(child(ref(database), `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getAllUsers = () => {
  return get(child(ref(database), `users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
