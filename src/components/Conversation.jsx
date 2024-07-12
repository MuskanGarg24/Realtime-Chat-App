import React from "react";
import ConversationItem from "./ConversationItem";
import useAllUsersData from "../hooks/useAllUsersData";
import useUserData from "../hooks/useUserData";
import useMessagesData from "../hooks/useMessagesData";

const Conversation = ({ searchQuery, selectedUser, onUserSelect }) => {
  const data = useAllUsersData();
  const loggedInUserData = useUserData();
  const loggedInUserId = loggedInUserData?.id;
  const selectedUserId = selectedUser?.id;
  const messages = useMessagesData(loggedInUserId, selectedUserId);

  const filteredData = data.filter(
    (item) =>
      item.id !== loggedInUserData?.id &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="p-1">
      {filteredData.length === 0 && (
        <div className="text-gray-400 text-center mt-5">No user found</div>
      )}
      {filteredData.map((item, index) => (
        <div onClick={() => onUserSelect(item)} key={index}>
          <ConversationItem
            message={messages[messages.length - 1]?.text}
            time={new Date(
              messages[messages.length - 1]?.timestamp
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            name={item.name}
            active={true}
          />
        </div>
      ))}
    </div>
  );
};

export default Conversation;
