import { useState, useEffect } from "react";
import { getMessagesBetweenTwoUsers } from "../firebase/chats";

const useMessagesData = (loggedInUserId, selectedUserId) => {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const getAllMessages = await getMessagesBetweenTwoUsers(
        loggedInUserId,
        selectedUserId
      );
      setMessages(getAllMessages);
    };
    fetchMessages();
  }, [loggedInUserId, selectedUserId, messages]);

  return messages;
};

export default useMessagesData;
