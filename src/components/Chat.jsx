import React, { useState } from "react";
import Conversation from "./Conversation";
import Messages from "./Messages";
import useUserData from "../hooks/useUserData";
import { createChatBetweenTwoUsers } from "../firebase/chats";
import { doSignOut } from "../firebase/auth";

const Chat = () => {
  const userData = useUserData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    createChatBetweenTwoUsers(userData.id, user.id, "", Date.now());
  };

  return (
    <div className="">
      <div className="flex bg-white dark:bg-gray-900">
        <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
          <div className="h-full overflow-y-auto">
            <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3 flex justify-between">
              {userData ? userData.name : "Loading..."}
              <button onClick={doSignOut}>Logout</button>
            </div>
            <div className="p-3">
              <input
                className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-gray-200 dark:bg-gray-700  w-full rounded-l-md"
                type="text"
                placeholder="Search Messages"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="text-lg font-semibol text-gray-600 dark:text-gray-200 p-3">
              Recent
            </div>
            <Conversation
              searchQuery={searchQuery}
              selectedUser={selectedUser}
              onUserSelect={handleUserSelect}
            />
          </div>
        </div>
        <div className="flex-grow  h-screen p-2 rounded-md">
          <Messages
            selectedUser={selectedUser}
            isOnline={selectedUser?.isOnline}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
