import { database } from "./firebase";
import { ref, set, get, update } from "firebase/database";

// Create a chat node between two users
export const createChatBetweenTwoUsers = async (
  userId1,
  userId2,
  lastMessage,
  timestamp
) => {
  const chatId1 = `${userId1}_${userId2}`;
  const chatId2 = `${userId2}_${userId1}`;

  const chatRef1 = ref(database, `chats/${chatId1}`);
  const chatRef2 = ref(database, `chats/${chatId2}`);

  // Check if either chat node already exists
  const snapshot1 = await get(chatRef1);
  const snapshot2 = await get(chatRef2);

  if (snapshot1.exists() || snapshot2.exists()) {
    console.log("Chat already exists between these users.");
    return;
  }

  // If neither chat node exists, create one
  set(chatRef1, {
    from: userId1,
    to: userId2,
    lastMessage: lastMessage,
    timestamp: timestamp,
  });
};

// Update the last message in a chat node
export const updateChatBetweenTwoUsers = async (
  userId1,
  userId2,
  lastMessage,
  timestamp
) => {
  const chatId1 = `${userId1}_${userId2}`;
  const chatId2 = `${userId2}_${userId1}`;

  const chatRef1 = ref(database, `chats/${chatId1}`);
  const chatRef2 = ref(database, `chats/${chatId2}`);

  // Check if either chat node already exists
  const snapshot1 = await get(chatRef1);
  const snapshot2 = await get(chatRef2);

  if (snapshot1.exists()) {
    update(chatRef1, {
      from: userId1,
      to: userId2,
      lastMessage: lastMessage,
      timestamp: timestamp,
    });
  } else if (snapshot2.exists()) {
    update(chatRef2, {
      from: userId1,
      to: userId2,
      lastMessage: lastMessage,
      timestamp: timestamp,
    });
  } else {
    console.log("Chat does not exist between these users.");
  }
};
