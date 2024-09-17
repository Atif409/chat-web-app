import { useState } from "react";
import MessageInput from "../components/MessageInput";
import { Box, Typography, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState([]);
  const location = useLocation();
  const userName = location.state?.name;
  // const userId = location.state?.userId;
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (!message) return;
    console.log("Message sent:", message);
    setMessage("");
    setMsg((prevMsg) => [...prevMsg, message]);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      p={1}
      bgcolor="background.paper"
    >
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
        <Typography variant="h5" >{userName}</Typography>
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
            {msg.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Typography>Send a message</Typography>
              </Box>
            ) : (
              msg.map((m, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="flex-end"
                  mb={1}
                >
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      borderRadius: "8px",
                      padding: "8px",
                      maxWidth: "60%",
                      wordWrap: "break-word",
                    }}
                  >
                    {m}
                  </Typography>
                </Box>
              ))
            )}
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
