
import { Avatar } from "@mui/material";

// eslint-disable-next-line react/prop-types
const MessageList = ({ avatar, name, msg, time,onClick,selected }) => {
    
  return (
    <>
      <div
        className={`p-4 flex flex-row  gap-2 cursor-pointer ${selected ? 'bg-slate-200':'hover:bg-slate-100'}`}
        onClick={onClick}
      >
        <div className="w-[50px] h-[50px] rounded-full border-slate-400 border-2 flex items-center justify-center">
          <Avatar alt={name} src={avatar} />
        </div>
        <div className="flex flex-row justify-between w-[80%]">
          <div className="">
            <h5 className="text-lg font-semibold">{name}</h5>
            <p className="text-gray-500 text-sm">{msg}</p>
          </div>
          <div className="text-gray-500 text-sm">{time}</div>
        </div>
      </div>
    </>
  );
};

export default MessageList;
