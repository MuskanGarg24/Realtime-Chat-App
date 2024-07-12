import { database } from "./firebase";
import { ref, set, get, child, update } from "firebase/database";

export const createUser = (userId, name, email, isOnline) => {
  set(ref(database, "users/" + userId), {
    id: userId,
    name: name,
    email: email,
    isOnline: isOnline,
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

export const updateUser = async (userId, isOnline) => {
  const userRef = ref(database, `users/${userId}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    update(userRef, {
      isOnline: isOnline,
    });
  } else {
    console.log("No data available");
  }
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
