import {useState,useEffect} from 'react'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'

import { truncateText } from '../utils/truncateText';
import { formatTime } from '../utils/formatTime';
import { getChats } from '../api/chatApi';
const ChatPage = () => {

  const [selectedChat, setSelectedChat] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async ()=>{
      const response= await getChats();
      setChats(response)
    }
    fetchChats();


  }, [chats]);

  const handleChatClick = () => {
    setSelectedChat(!selectedChat);
  };

  return (
    <>
    <div className="grid grid-cols-12 min-h-screen">
    <div className="col-span-3 max-h-screen overflow-y-auto">      {chats.map((chat) => (
        <MessageList
          key={chat.id}
          avatar={chat.avatar}
          name={chat.name}
          msg={truncateText(chat.lastMessage, 30)}
          time={formatTime(chat.updatedAt)}
          onClick={handleChatClick}
        />
      ))}</div>

    
    <div className="col-span-9 border-l-2">
    <div className="gap-4">
        <div className="w-full  mt-2 h-[85vh] overflow-y-auto pl-4 pr-4 ">
  
        </div>
        <div className="">
          <MessageInput />
        </div>
      </div>

    </div>
    </div>
        </>
  )
}

export default ChatPage