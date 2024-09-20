export const lastMessage = (chat) => {
  let lastMessageContent = "";

  if (chat.messages && chat.messages.length > 0) {
    lastMessageContent = chat.messages[chat.messages.length - 1].content;
  } else {
    console.log("No messages available.");
  }

  console.log("Content of the last message:", lastMessageContent);
  return lastMessageContent;
};

export const lastMessageTime = (chat) => {
  let lastMessageTime = "";

  if (chat.messages && chat.messages.length > 0) {
    lastMessageTime = chat.messages[chat.messages.length - 1].time;
  } else {
    return null;
  }

  console.log("Timeof the last message:", lastMessageTime);
  return lastMessageTime;
};
