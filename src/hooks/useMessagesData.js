import { useState, useEffect } from "react";
import { getMessagesBetweenTwoUsers } from "../firebase/chats";

const useMessagesData = (loggedInUserId, selectedUserId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const getAllMessages = await getMessagesBetweenTwoUsers(
        loggedInUserId,
        selectedUserId
      );
      const formattedMessages = getAllMessages
        ? Object.values(getAllMessages)
        : [];
      setMessages(formattedMessages);
    };
    fetchMessages();
  }, [loggedInUserId, selectedUserId]);

  return messages;
};

export default useMessagesData;
