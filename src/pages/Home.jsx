import {
  Avatar,
  Box,
  Button,
  Typography,
  Modal,
  TextField,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import { truncateText } from "../utils/truncateText";
import Users from "../components/Users";
// import { formatTime } from "../utils/formatTime";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddIcon from "@mui/icons-material/Add";

import { getUsers } from "../api/chatApi";
import { useNavigate } from "react-router-dom";
import { getRandomEmoji, emojiToImage } from "../utils/emojiUtil";
const Home = () => {
  const navigate = useNavigate();
  const [selectedChatType, setSelectedChatType] = useState("individual");
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [name, setName] = useState("");

  const [users, setUSers] = useState([]);

  
  const [emojiImgUrl, setEmojiImgUrl] = useState("");

  useEffect(() => {
    const emoji = getRandomEmoji();
    const emojiImg = emojiToImage(emoji);
    setEmojiImgUrl(emojiImg);
  }, []);

  const individualChats = [
    {
      id: 1,
      name: "John Doe",
      image: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Hey, how are you?",
      time: "2:30 PM",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://i.pravatar.cc/150?img=2",
      lastMessage: "Can we meet tomorrow?",
      time: "1:15 PM",
    },
    {
      id: 3,
      name: "Mike Johnson",
      image: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Sure, I’ll send the documents.",
      time: "12:45 PM",
    },
    {
      id: 4,
      name: "Sarah Williams",
      image: "https://i.pravatar.cc/150?img=4",
      lastMessage: "Great! Looking forward to it.",
      time: "11:30 AM",
    },
    {
      id: 5,
      name: "David Brown",
      image: "https://i.pravatar.cc/150?img=5",
      lastMessage: "Let me know if you need anything.",
      time: "Yesterday",
    },
  ];
  const groupChats = [
    {
      id: 1,
      name: "Project Alpha Team",
      image: "https://i.pravatar.cc/150?img=6",
      lastMessage: "Alice: The deadline is tomorrow.",
      time: "3:45 PM",
    },
    {
      id: 2,
      name: "Family Group",
      image: "https://i.pravatar.cc/150?img=7",
      lastMessage: "Mom: Don’t forget to bring dessert!",
      time: "2:00 PM",
    },
    {
      id: 3,
      name: "Gym Buddies",
      image: "https://i.pravatar.cc/150?img=8",
      lastMessage: "Tom: Who’s coming to the workout session?",
      time: "1:30 PM",
    },
    {
      id: 4,
      name: "Study Group",
      image: "https://i.pravatar.cc/150?img=9",
      lastMessage: "Linda: Let's review chapters 3 and 4.",
      time: "12:00 PM",
    },
    {
      id: 5,
      name: "Weekend Getaway",
      image: "https://i.pravatar.cc/150?img=10",
      lastMessage: "Jake: Ready for the trip this weekend?",
      time: "Yesterday",
    },
  ];
  const genrateEmojiUrl = () => {
    const emoji = getRandomEmoji();
    const emojiImg = emojiToImage(emoji);
    console.log(emojiImg);
    return emojiImg;
  };


  const handleChatClick = (chat) => {
    console.log("Chat clicked:", chat);
    navigate("/app/chat");
  };

  const chats =
    selectedChatType === "individual" ? individualChats : groupChats;
  const handleOpen = () => {
    setOpen(true);
    handleGetUsers();
  };
  const handleClose = () => setOpen(false);

  const handleGroupModalOpen = () => {
    setOpenGroupModal(true);
    handleGetUsers();
  };
  const handleGroupModalClose = () => setOpenGroupModal(false);
  const handleGetUsers = async () => {
    const response = await getUsers();
    const filteredResponse = response.filter((user) => user.id !== userId);

    console.table(filteredResponse);

    setUSers(filteredResponse);
  };

  const handleChat = (user) => {
    setName(user.name);
    if (user.name) {
      navigate("/app/chat", { state: { name: user.name } });
    }
  };
  return (
    <Box
      component="div"
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          backgroundColor: "#ffffff",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            alt={userName}
            src={emojiImgUrl}
            sx={{ width: 50, height: 50, border: "4px solid #dadada" }}
          />
          <Typography variant="h5">{userName}</Typography>
        </Box>

        <Box
          component="div"
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h4">Messenger</Typography>
        </Box>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SettingsIcon />
        </Box>
      </Box>

      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 2,
          backgroundColor: "#dadada",
        }}
      >
        <Button
          onClick={handleOpen}
          sx={{
            width: "10%",
            backgroundColor: "#000000",
            color: "#ffffff",
            mr: 2,
          }}
        >
          Users
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: {
                xs: "90%",
                sm: "70%",
                md: "60%",
                lg: "50%",
                xl: "40%",
              },

              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: "10px",
            }}
          >
            {users.map((user) => (
              <Users
                key={user.id}
                name={user.name}
                avatar={genrateEmojiUrl()}
                onClick={() => handleChat(user)}
                btnTitle="Chat"
                btnIcon={<ChatBubbleOutlineIcon />}
              />
            ))}
          </Box>
        </Modal>
        <Button
          sx={{
            width: "40%",
            backgroundColor:
              selectedChatType === "individual" ? "white" : "inherit",
            color: selectedChatType === "individual" ? "black" : "inherit",
          }}
          onClick={() => setSelectedChatType("individual")}
        >
          Chat
        </Button>
        <Button
          sx={{
            width: "40%",
            backgroundColor: selectedChatType === "group" ? "white" : "inherit",
            color: selectedChatType === "group" ? "black" : "inherit",
          }}
          onClick={() => setSelectedChatType("group")}
        >
          Group Chat
        </Button>
      </Box>

      {selectedChatType === "group" && (
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              width: "100%",
              backgroundColor: "#000000",
              color: "#ffffff",
            }}
            onClick={handleGroupModalOpen}
          >
            + Create New Group
          </Button>
          <Modal
            open={openGroupModal}
            onClose={handleGroupModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: {
                  xs: "90%",
                  sm: "70%",
                  md: "60%",
                  lg: "50%",
                  xl: "40%",
                },

                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                borderRadius: "10px",
              }}
            >
              <Box>
                {users.map((user) => (
                  <Users
                    key={user.id}
                    name={user.name}
                    src={genrateEmojiUrl()}
                    onClick={() => handleChat(user)}
                    btnTitle="Add"
                    btnIcon={<AddIcon />}
                  />
                ))}
              </Box>

              <Box
                component={"div"}
                sx={{
                  width: "100%",
                  mt: 2,
                }}
              >
                <TextField
                  variant="outlined"
                  label="Write Group Name"
                  sx={{
                    width: "100%",
                  }}
                />

                <Button
                  sx={{
                    width: "100%",
                    mt: 2,
                    backgroundColor: "#000000",
                    color: "#ffffff",
                  }}
                >
                  Create Group
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}

      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          overflowY: "auto",
          flexGrow: 1,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {chats.map((chat) => (
          <ChatList
            key={chat.id}
            avatar={chat.image}
            name={chat.name}
            msg={truncateText(chat.lastMessage, 50)}
            time={chat.time}
            onClick={() => {
              handleChatClick(chat);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
