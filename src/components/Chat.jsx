import React, { useState } from "react";
import Conversation from "./Conversation";
import Messages from "./Messages";
import useUserData from "../hooks/useUserData";

const Chat = () => {
  const userData = useUserData();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="">
      <div className="flex bg-white dark:bg-gray-900">
        <div className="w-80 h-screen dark:bg-gray-800 bg-gray-100 p-2 hidden md:block">
          <div className="h-full overflow-y-auto">
            <div className="text-xl font-extrabold text-gray-600 dark:text-gray-200 p-3">
              {userData ? userData.name : "Loading..."}
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
            <Conversation searchQuery={searchQuery} />
          </div>
        </div>
        <div className="flex-grow  h-screen p-2 rounded-md">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Chat;
