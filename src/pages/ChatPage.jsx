import { useState, useEffect } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import { truncateText } from "../utils/truncateText";
import { formatTime } from "../utils/formatTime";
import { getChats } from "../api/chatApi";
// import { Avatar } from "@mui/material";
const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState([]);
// const [avatar,setAvatar] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    console.log("Message sent:", message);
    setMessage("");
    setMsg((prevMsg) => [...prevMsg, message]);
  };

  useEffect(() => {
    const fetchChats = async () => {
      const response = await getChats();
      setChats(response);
    };
    fetchChats();
  }, [chats]);

  const handleChatClick = (chat) => {
    setSelectedChat(chat.id);
    setName(chat.name);
    // setAvatar(chat.avatar)
  };

  return (
    <>
      <div className="grid grid-rows-12 max-h-screen">
        <div className="  row-span-1 border-b grid grid-cols-12">
          <div className="lg:flex hidden flex-col col-span-4 items-center justify-center ">
            <h2 className="text-3xl font-semibold ">Messenger</h2>
          </div>
          {selectedChat == null ? (
            <div className=""></div>
          ) : (
            <div className="lg:col-span-8 col-span-12 border-l-2 flex flex-col items-center justify-center">
              <div className="flex flex-row items-center justify-center">
       
          {/* <Avatar alt={name} src={avatar} /> */}
          <h3 className="text-xl">{name}</h3>
       
              </div>
           
              <p className="text-xs text-gray-500">Active Now</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-12 row-span-11 ">
          <div className=" lg:flex hidden flex-col col-span-4 max-h-[93vh] overflow-y-auto no-scrollbar ">
            {chats.map((chat) => (
              <MessageList
                key={chat.id}
                avatar={chat.avatar}
                name={chat.name}
                msg={truncateText(chat.lastMessage, 30)}
                time={formatTime(chat.updatedAt)}
                onClick={() => {
                  handleChatClick(chat);
                }}
                selected={selectedChat === chat.id}
              />
            ))}
          </div>

          <div className="lg:col-span-8 col-span-12 border-l-2">
            {selectedChat == null ? (
              <div className="flex items-center justify-center h-full">
                <p className=""> Please Select a chat</p>
              </div>
            ) : (
              <div className="gap-4 ">
                <div className="w-full  mt-2 h-[76vh] overflow-y-auto pl-4 pr-4 ">
                  {!msg || msg.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <p>Send a message</p>
                    </div>
                  ) : (
                    msg.map((m, index) => (
                      <div key={index} className="w-auto flex justify-end">
                        <p className="bg-blue-600 text-white inline-block text-center rounded pl-2 pr-2 mb-2 text-wrap">
                          {m}
                        </p>
                      </div>
                    ))
                  )}
                </div>
                <div className="">
                  <MessageInput
                    message={message}
                    handleInputChange={handleInputChange}
                    handleSendClick={handleSendClick}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
