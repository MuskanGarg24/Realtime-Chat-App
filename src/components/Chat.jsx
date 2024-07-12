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
      <div className="flex bg-[#252837]">
        <div className="w-80 h-screen bg-[#252837] p-2 hidden md:block">
          <div className="h-full overflow-y-auto">
            <div className="text-xl font-extrabold dark:text-gray-200 p-3 flex justify-between">
              <p className="text-white">
                {userData ? userData.name : "Loading..."}
              </p>
              <button className="text-white" onClick={doSignOut}>
                Logout
              </button>
            </div>
            <div className="p-3">
              <input
                className="input text-white text-sm p-3 focus:outline-none bg-[#1e1f2c] w-full rounded-l-md"
                type="text"
                placeholder="Search Messages"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="text-lg font-semibold text-white p-3">Recent</div>
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
