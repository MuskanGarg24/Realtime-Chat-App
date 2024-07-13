import { database } from "./firebase";
import { ref, set, get, update, push } from "firebase/database";

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

// Get last message and timestamp between two users
export const getLastMessageBetweenTwoUsers = async (userId1, userId2) => {
  const chatId1 = `${userId1}_${userId2}`;
  const chatId2 = `${userId2}_${userId1}`;

  const chatRef1 = ref(database, `chats/${chatId1}`);
  const chatRef2 = ref(database, `chats/${chatId2}`);

  const snapshot1 = await get(chatRef1);
  const snapshot2 = await get(chatRef2);

  if (snapshot1.exists()) {
    return snapshot1.val();
  } else if (snapshot2.exists()) {
    return snapshot2.val();
  } else {
    return {};
  }
};

// Create a new message node between two users
export const createMessageNodeBetweenTwoUsers = async (
  userId1,
  userId2,
  text,
  timestamp,
  isDelivered = false
) => {
  const chatId1 = `${userId1}_${userId2}`;
  const chatId2 = `${userId2}_${userId1}`;

  const messageStatus = {
    isDelivered: isDelivered,
    isRead: false,
  };

  const messageData = {
    from: userId1,
    to: userId2,
    text: text,
    timestamp: timestamp,
    messageStatus: messageStatus,
  };

  const messageRef1 = ref(database, `messages/${chatId1}`);
  const messageRef2 = ref(database, `messages/${chatId2}`);

  // Check if either message node exists
  const snapshot1 = await get(messageRef1);
  const snapshot2 = await get(messageRef2);

  if (snapshot1.exists()) {
    await push(messageRef1, messageData);
  } else if (snapshot2.exists()) {
    await push(messageRef2, messageData);
  } else {
    await push(messageRef1, messageData);
  }
};

// Get all messages between two users
export const getMessagesBetweenTwoUsers = async (userId1, userId2) => {
  const chatId1 = `${userId1}_${userId2}`;
  const chatId2 = `${userId2}_${userId1}`;

  const messageRef1 = ref(database, `messages/${chatId1}`);
  const messageRef2 = ref(database, `messages/${chatId2}`);

  const snapshot1 = await get(messageRef1);
  const snapshot2 = await get(messageRef2);

  if (snapshot1.exists()) {
    return snapshot1.val();
  } else if (snapshot2.exists()) {
    return snapshot2.val();
  } else {
    return {};
  }
};

// Update the status of read and delivered messages
export const updateMessageStatus = async (
  userId1,
  userId2,
  messageId,
  status
) => {
  const chatId1 = `${userId1}_${userId2}`;
  const chatId2 = `${userId2}_${userId1}`;

  const messageRef1 = ref(database, `messages/${chatId1}/${messageId}`);
  const messageRef2 = ref(database, `messages/${chatId2}/${messageId}`);

  const snapshot1 = await get(messageRef1);
  const snapshot2 = await get(messageRef2);

  if (snapshot1.exists()) {
    update(messageRef1, {
      messageStatus: status,
    });
  } else if (snapshot2.exists()) {
    update(messageRef2, {
      messageStatus: status,
    });
  } else {
    console.log("Message does not exist between these users.");
  }
};
