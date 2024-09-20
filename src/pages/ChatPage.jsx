import { useState, useEffect, useRef } from "react";
import MessageInput from "../components/MessageInput";
import { Box, Typography, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { fetchMessages, sendMessageToChat } from "../api/chatApi";
import { formatTime } from "../utils/formatTime";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const userName = location.state?.name;
  const chatId = location.state?.chatId;
  const messagesEndRef = useRef(null); // Ref for scrolling

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const chatMessages = await fetchMessages(chatId);
        setMessages(chatMessages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    loadMessages();
  }, [chatId]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = async () => {
    if (!message) return;

    const newMessage = {
      id: Date.now(),
      senderId: localStorage.getItem("userId"),
      content: message,
      time: new Date().toISOString(),
    };

    try {
      await sendMessageToChat(chatId, newMessage);

      setMessages((prevMessages) => [newMessage, ...prevMessages]); 
      setMessage("");

      console.log("Message sent:", newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      p={1}
      bgcolor="background.paper"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h5">{userName}</Typography>
        <Typography variant="body2">Active Now</Typography>
      </Box>
      <Box display="flex" flexGrow={1} overflow="hidden">
        <Box flex={1} display="flex" flexDirection="column" p={2} gap={2}>
          <Paper
            variant="outlined"
            style={{
              flexGrow: 1,
              padding: "16px",
              overflowY: "auto",
            }}
          >
            {messages.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Typography>Send a message</Typography>
              </Box>
            ) : (
              [...messages].reverse().map((m, index) => ( // Reverse the order
                <Box
                  key={index}
                  display="flex"
                  flexDirection="column"
                  justifyContent={
                    m.senderId === localStorage.getItem("userId")
                      ? "flex-end"
                      : "flex-start"
                  }
                  mb={1}
                >
                  <Box
                    display="flex"
                    justifyContent={
                      m.senderId === localStorage.getItem("userId")
                        ? "flex-end"
                        : "flex-start"
                    }
                  >
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{
                        backgroundColor:
                          m.senderId === localStorage.getItem("userId")
                            ? "primary.main"
                            : "grey.300",
                        color:
                          m.senderId === localStorage.getItem("userId")
                            ? "white"
                            : "black",
                        borderRadius: "8px",
                        padding: "8px",
                        maxWidth: "60%",
                        wordWrap: "break-word",
                      }}
                    >
                      {m.content}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{
                      textAlign:
                        m.senderId === localStorage.getItem("userId")
                          ? "right"
                          : "left",
                      marginTop: "4px",
                      color: "text.secondary",
                      fontSize: "0.8rem",
                    }}
                  >
                    {formatTime(m.time)}
                  </Typography>
                </Box>
              ))
            )}
            <div ref={messagesEndRef} /> {/* Scroll anchor */}
          </Paper>

          <MessageInput
            message={message}
            handleInputChange={handleInputChange}
            handleSendClick={handleSendClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
