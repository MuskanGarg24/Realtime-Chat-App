import React, { useState, useEffect } from "react";
import ConversationItem from "./ConversationItem";
import useAllUsersData from "../hooks/useAllUsersData";
import useUserData from "../hooks/useUserData";
import { getLastMessageBetweenTwoUsers } from "../firebase/chats";

const Conversation = ({ searchQuery, onUserSelect }) => {

  // Fetching all users data
  const data = useAllUsersData();

  // Fetching the logged in user data
  const loggedInUserData = useUserData();

  // Get the filtered data based on the search query
  const filteredData = data.filter(
    (item) =>
      item.id !== loggedInUserData?.id &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  // State to store the last messages and online status
  const [lastMessages, setLastMessages] = useState({});
  const [onlineStatus, setOnlineStatus] = useState({});

  // Fetch the last messages and online status
  useEffect(() => {
    const fetchUserLastMessages = async () => {

      const lastMessagesData = {};
      const onlineStatusData = {};

      for (const user of filteredData) {
        const getMessages = await getLastMessageBetweenTwoUsers(
          loggedInUserData?.id,
          user.id
        );

        lastMessagesData[user.id] = {
          lastMessage: getMessages?.lastMessage,
          timestamp: getMessages?.timestamp,
        };

        const isOnline = user.isOnline;
        onlineStatusData[user.id] = isOnline;
      }

      setLastMessages(lastMessagesData);
      setOnlineStatus(onlineStatusData);

    };

    if (filteredData.length > 0) {
      fetchUserLastMessages();
    }

  }, [filteredData, loggedInUserData?.id]);

  return (
    <div className="p-1">
      {filteredData.length === 0 && (
        <div className="text-gray-400 text-center mt-5">No user found</div>
      )}
      {filteredData.map((item) => (
        <div className="mt-3" onClick={() => onUserSelect(item)} key={item.id}>
          <ConversationItem
            message={lastMessages[item.id]?.lastMessage}
            time={
              lastMessages[item.id]?.timestamp
                ? new Date(lastMessages[item.id]?.timestamp).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )
                : ""
            }
            name={item.name}
            active={onlineStatus[item.id]}
          />
        </div>
      ))}
    </div>
  );
};

export default Conversation;
