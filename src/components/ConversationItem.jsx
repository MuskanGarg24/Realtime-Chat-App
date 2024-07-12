import React from "react";
import sent from "../assets/singleTick.png";
import delivered from "../assets/doubleTick.png";
import read from "../assets/read.png";

const ConversationItem = ({
  active,
  time,
  name,
  message,
  messageStatus,
  messageStatusCheckDisplay,
}) => {
  const _class = active ? "bg-gray-200" : "bg-white";

  return (
    <div>
      <div
        className={
          "conversation-item p-1 dark:bg-gray-700 hover:bg-gray-200 m-1 rounded-md " +
          _class
        }
      >
        <div className={"flex items-center p-2  cursor-pointer  "}>
          <div className="w-7 h-7 m-1">
            <img
              className="rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
          </div>
          <div className="flex-grow p-2">
            <div className="flex justify-between text-md ">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200 flex">
                {name}
                {active && (
                  <div className="bg-green-500 w-2 h-2 rounded-full ml-2 mt-[7px]"></div>
                )}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-300">
                {time}
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate flex justify-between">
              {message}
              {messageStatusCheckDisplay && (
                <img
                  src={
                    messageStatus?.isRead
                      ? read
                      : messageStatus?.isDelivered
                      ? delivered
                      : sent
                  }
                  alt="status"
                  width={20}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
