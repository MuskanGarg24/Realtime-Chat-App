import React, { useState, useEffect } from "react";
import ConversationItem from "./ConversationItem";
import useAllUsersData from "../hooks/useAllUsersData";
import useUserData from "../hooks/useUserData";
import { getLastMessageBetweenTwoUsers } from "../firebase/chats";

const Conversation = ({ searchQuery, selectedUser, onUserSelect }) => {
  const data = useAllUsersData();
  const loggedInUserData = useUserData();
  const loggedInUserId = loggedInUserData?.id;

  const filteredData = data.filter(
    (item) =>
      item.id !== loggedInUserData?.id &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const [lastMessages, setLastMessages] = useState({});
  const [onlineStatus, setOnlineStatus] = useState({});

  useEffect(() => {
    const fetchUserLastMessages = async () => {
      const lastMessagesData = {};
      const onlineStatusData = {};
      for (const user of filteredData) {
        const getMessages = await getLastMessageBetweenTwoUsers(
          loggedInUserId,
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
  }, [filteredData, loggedInUserId]);

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
            messageStatus={lastMessages[item.id]?.messageStatus}
            messageStatusCheckDisplay={
              loggedInUserId === lastMessages[item.id]?.from
            }
          />
        </div>
      ))}
    </div>
  );
};

export default Conversation;
