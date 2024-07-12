import React from "react";
import ConversationItem from "./ConversationItem";
import useAllUsersData from "../hooks/useAllUsersData";
import { auth } from "../firebase/firebase";

const Conversation = ({ searchQuery }) => {
  const data = useAllUsersData();

  const filteredData = data.filter(
    (item) =>
      item.id !== auth.currentUser.uid &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="p-1">
      {filteredData.length === 0 && (
        <div className="text-gray-400 text-center mt-5">No user found</div>
      )}
      {filteredData.map((item, index) => (
        <ConversationItem
          key={index}
          message="Hey there! Are you finish creating the chat app?"
          time="just now"
          name={item.name}
          active={true}
        />
      ))}
    </div>
  );
};

export default Conversation;
