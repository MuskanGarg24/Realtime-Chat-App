import React, { useEffect, useState } from "react";
import useUserData from "../hooks/useUserData";
import {
  updateChatBetweenTwoUsers,
  createMessageNodeBetweenTwoUsers,
  updateMessageStatus,
} from "../firebase/chats";
import useMessagesData from "../hooks/useMessagesData";
import sent from "../assets/singleTick.png";
import delivered from "../assets/doubleTick.png";
import read from "../assets/read.png";

const Messages = ({ selectedUser, isOnline }) => {
  const [inputMessage, setInputMessage] = useState("");

  const loggedInUser = useUserData();
  const loggedInUserId = loggedInUser?.id;
  const selectedUserId = selectedUser?.id;
  const messagesData = useMessagesData(loggedInUserId, selectedUserId);

  const [messages, setMessages] = useState([]);

  const handleMessageSend = async () => {
    if (!selectedUser || !loggedInUserId || inputMessage.trim() === "") return;

    const timestamp = new Date().toISOString();

    const isDelivered = selectedUser?.isOnline;

    await createMessageNodeBetweenTwoUsers(
      loggedInUserId,
      selectedUserId,
      inputMessage,
      timestamp,
      isDelivered
    );

    await updateChatBetweenTwoUsers(
      loggedInUserId,
      selectedUserId,
      inputMessage,
      timestamp
    );

    setInputMessage("");
  };

  useEffect(() => {
    if (messagesData) {
      const formattedMessages = Object.entries(messagesData);
      if (isOnline) {
        formattedMessages.forEach(([messageId, message]) => {
          if (!message.messageStatus?.isDelivered) {
            updateMessageStatus(loggedInUserId, selectedUserId, messageId, {
              ...message.messageStatus,
              isDelivered: true,
            });
          }
          if (
            loggedInUserId === message.to &&
            selectedUserId === message.from &&
            !message.messageStatus?.isRead
          ) {
            updateMessageStatus(loggedInUserId, selectedUserId, messageId, {
              ...message.messageStatus,
              isRead: true,
            });
          }
        });
      }
      setMessages(formattedMessages.map(([_, message]) => message));
    }
  }, [messagesData, isOnline]);

  return (
    <>
      {selectedUser ? (
        <div className="flex-grow h-full flex flex-col">
          <div className="w-full h-15 p-1 bg-[#1e1f2c] shadow-md rounded-xl rounded-bl-none rounded-br-none">
            <div className="flex p-2 align-middle items-center">
              <div className="p-2 md:hidden rounded-full mr-1 hover:bg-purple-500 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <div className="border rounded-full border-white p-1/2">
                <img
                  className="w-14 h-14 rounded-full"
                  src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                  alt="avatar"
                />
              </div>
              <div className="flex-grow px-4">
                <div className="text-lg text-gray-50 font-semibold">
                  {selectedUser.name}
                </div>
                <div className="flex items-center mt-1">
                  <div className="text-xs text-gray-50">
                    {isOnline ? "Online" : "Offline"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-grow bg-[#252837] my-2 p-2 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.from === loggedInUserId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-end w-3/4 ${
                    msg.from === loggedInUserId
                      ? "bg-[#1e1f2c]"
                      : "bg-[#6a85fa]"
                  } dark:bg-gray-800 m-1 rounded-xl ${
                    msg.from === loggedInUserId
                      ? "rounded-br-none"
                      : "rounded-bl-none"
                  } sm:w-3/4 max-w-xl md:w-auto`}
                >
                  <div className="px-3 py-2">
                    <div className="text-white text-md">{msg.text}</div>
                    <div className="text-xs text-gray-400 flex justify-between mt-1">
                      <p>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {msg.from === loggedInUserId && (
                        <img
                          src={
                            msg.messageStatus?.isRead
                              ? read
                              : msg.messageStatus?.isDelivered
                              ? delivered
                              : sent
                          }
                          alt="status"
                          width={20}
                          className="mr-1"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-15 px-2 rounded-xl bg-gray-100">
            <div className="flex items-center">
              <div className="flex flex-grow p-2">
                <input
                  className="input text-lg px-5 focus:outline-none bg-gray-100 flex-grow rounded-lg"
                  type="text"
                  placeholder="Type your message ..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <div
                  className="bg-gray-100 flex justify-center items-center text-gray-400 cursor-pointer px-5"
                  onClick={handleMessageSend}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white text-3xl mt-60">
              Select a chat to start conversation
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
