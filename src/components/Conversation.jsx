import React from "react";
import ConversationItem from "./ConversationItem";
import useAllUsersData from "../hooks/useAllUsersData";
import useUserData from "../hooks/useUserData";

const Conversation = ({ searchQuery, selectedUser, onUserSelect }) => {
  const data = useAllUsersData();
  const loggedInUserData = useUserData();

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
            message="Hey there! Are you finish creating the chat app?"
            time="just now"
            name={item.name}
            active={true}
          />
        </div>
      ))}
    </div>
  );
};

export default Conversation;
