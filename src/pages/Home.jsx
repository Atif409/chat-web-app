import {
  Avatar,
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState, useEffect } from "react";
import ChatList from "../components/ChatList";
import { truncateText } from "../utils/truncateText";
import Users from "../components/Users";
import { formatTime } from "../utils/formatTime";
import { lastMessage, lastMessageTime } from "../utils/lastMessage";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AddIcon from "@mui/icons-material/Add";
import { getUsers, getChats, createChat } from "../api/chatApi";
import { useNavigate } from "react-router-dom";
import { getRandomEmoji, emojiToImage } from "../utils/emojiUtil";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
/**
 * Home page component. Displays a list of chats, a button to create a new individual chat, and a button to create a new group chat.
 * When the user clicks on a chat, it navigates to the chat page with the chatId and the name and id of the user to chat with.
 * When the user clicks on the new individual chat button, it opens a modal with a list of users to chat with.
 * When the user clicks on the new group chat button, it opens a modal with a list of users to add to the group chat.
 * @prop {string} selectedChatType - The type of chat to display. Can be "individual" or "group". Default is "individual".
 * @prop {string} userName - The name of the user.
 * @prop {string} userId - The id of the user.
 * @prop {array} chats - The list of chats to display.
 * @prop {array} users - The list of users to display in the modal.
 * @prop {function} handleChatClick - The function to call when the user clicks on a chat.
 * @prop {function} handleGetUsers - The function to call when the user clicks on the new individual chat button.
 * @prop {function} handleGroupModalOpen - The function to call when the user clicks on the new group chat button.
 * @prop {function} handleGroupModalClose - The function to call when the user closes the group chat modal.
 * @prop {function} handleOpen - The function to call when the user clicks on the new individual chat button.
 * @prop {function} handleClose - The function to call when the user closes the individual chat modal.
 */

const Home = () => {
  const navigate = useNavigate();
  const [selectedChatType, setSelectedChatType] = useState("individual");
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [users, setUSers] = useState([]);
  const [emojiImgUrl, setEmojiImgUrl] = useState("");
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState([]);
  const [otherUserNames, setOtherUserNames] = useState([]);
  const [individualChats, setIndividualChats] = useState([]);
  useEffect(() => {
    /**
     * Fetches users and chats from the server and stores them in state variables
     * @returns {Promise<void>}
     */
    const fetchUsersAndChats = async () => {
      try {
        const usersData = await getUsers();
        // Store all users in the state variable
        setUser(usersData);
        const chatsData = await getChats();
        if (chatsData) {
          // Store all chats in the state variable
          setChat(chatsData);
          console.log("Chats:", chatsData);
        } else {
          console.log("No chats found");
        }
      } catch (error) {
        console.error("Error fetching users or chats:", error);
      }
    };

    fetchUsersAndChats();
  }, []);
  /**
   * Handles the chat click event. If the chat already exists, navigates to it.
   * If the chat does not exist, creates a new chat and navigates to it.
   * @param {{name: string, id: string}} user The user to chat with
   * @returns {Promise<void>}
   */
  const handleChat = async (user) => {
    if (user.name) {
      const existingChat = chat.find(
        (chat) =>
          chat.participants.includes(user.id) &&
          chat.participants.includes(userId)
      );
      if (existingChat) {
        console.log("Chat already exists:", existingChat);
        // Navigate to the existing chat
        navigate("/app/chat", {
          state: {
            // Pass the chatId to the chat page
            chatId: existingChat.id,
            // Pass the name of the user to chat with
            name: user.name,
            // Pass the id of the user to chat with
            userId: user.id,
          },
        });
      } else {
        console.log("Please Create a new chat");
        // Create a new chat
        const newChat = await createChat({
          // Add the logged-in user and the user to chat with as participants
          participants: [
            { id: userId, name: userName },
            { id: user.id, name: user.name },
          ],
          // Initialize the messages array as empty
          messages: [],
        });
        console.log("New chat created:", newChat);
        // Navigate to the new chat
        navigate("/app/chat", {
          state: {
            // Pass the chatId to the chat page
            chatId: newChat.id,
            // Pass the name of the user to chat with
            name: user.name,
            // Pass the id of the user to chat with
            userId: user.id,
          },
        });
      }
    }
  };
  useEffect(() => {
    const emoji = getRandomEmoji();
    const emojiImg = emojiToImage(emoji);
    setEmojiImgUrl(emojiImg);
  }, []);

  useEffect(() => {
    if (chat.length > 0) {
      // Filter chats where the logged-in user's id is in the participants' list
      const filteredChats = chat.filter((chat) =>
        chat.participants.some((participant) => participant.id === userId)
      );

      setIndividualChats(filteredChats);
      console.log("Individual Chats:", filteredChats);
    }
  }, [chat, userId]);

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
  /**
   * Generates a random emoji and converts it to a base64 image using canvas.
   * Returns the base64 image URL as a string.
   * @returns {string} - The base64 image URL of the generated emoji.
   */
  const genrateEmojiUrl = () => {
    // Generate a random emoji from a specific Unicode range (smileys)
    const emoji = getRandomEmoji();
    // Convert the emoji to a base64 image using canvas
    const emojiImg = emojiToImage(emoji);
    console.log(emojiImg);
    return emojiImg;
  };

  /**
   * Handles the click event of a chat in the chat list.
   * Navigates to the chat page with the chatId and the name and id of the user to chat with.
   * @param {Object} chat - The selected chat object.
   * @description
   * This function is called when a chat is clicked in the chat list.
   * It finds the participant who is not the logged-in user and navigates to the chat page
   * with the chatId and the name and id of the user to chat with.
   */
  const handleChatClick = async (chat) => {
    // Check if the chat has more than one participant
    if (chat.participants && chat.participants.length > 1) {
      // Find the participant who is not the logged-in user
      const clickedUser = chat.participants.find(
        (participant) => participant.id !== userId
      );

      // Check if the clicked user is not the logged-in user
      if (clickedUser) {
        // Find the selected user in the user list
        const selectedUser = user.find((user) => user.id === clickedUser.id);

        // Check if the selected user is found in the user list
        if (selectedUser) {
          // Navigate to the chat page with the chatId and the name and id of the user to chat with
          navigate("/app/chat", {
            state: {
              chatId: chat.id,
              name: selectedUser.name,
              userId: selectedUser.id,
            },
          });
        } else {
          console.log("User not found in users array.");
        }
      } else {
        console.log("No valid clickedUser found.");
      }
    } else {
      console.log("Not enough participants in this chat.");
    }
  };

  const chats =
    selectedChatType === "individual" ? individualChats : groupChats;

  useEffect(() => {
    const otherUsers = individualChats.map((chat) => {
      // Find the participant who is not the logged-in user
      const otherUser = chat.participants.find(
        (participant) => participant.id !== userId
      );

      // Return the other user's name or "Unknown User" if not found
      return otherUser?.name || "Unknown User";
    });

    setOtherUserNames(otherUsers);
  }, [individualChats, user, userId]);

  const handleOpen = () => {
    setOpen(true);
    handleGetUsers();
  };
  const handleClose = () => setOpen(false);

  /**
   * Opens the modal for creating a new group chat.
   * @function
   */
  const handleGroupModalOpen = () => {
    // Open the modal
    setOpenGroupModal(true);
    // Get the list of users to display in the modal
    handleGetUsers();
  };
  const handleGroupModalClose = () => setOpenGroupModal(false);
  const handleGetUsers = async () => {
    const response = await getUsers();
    const filteredResponse = response.filter((user) => user.id !== userId);

    console.table(filteredResponse);

    setUSers(filteredResponse);
  };
  // const handleChat = (user) => {
  //   if (user.name) {
  //     navigate("/app/chat", { state: { name: user.name, userId: user.id } });
  //   }
  // };
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
          <IconButton
            aria-label="users"
            onClick={handleOpen}
            sx={{
              backgroundColor: "#000000",
              color: "#ffffff",
              mr: 2,
              ":hover": {
                border: "2px solid #000000",
                color: "#000000",
              },
            }}
          >
            <PeopleAltIcon />
          </IconButton>
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
        {chats.map((chat, index) => (
          <ChatList
            key={chat.id}
            name={
              selectedChatType === "individual"
                ? otherUserNames[index]
                : chat.name
            }
            avatar={
              selectedChatType === "individual" ? genrateEmojiUrl() : chat.image
            }
            msg={truncateText(
              selectedChatType === "individual"
                ? lastMessage(chat)
                : chat.lastMessage,
              20
            )}
            time={
              selectedChatType === "individual"
                ? formatTime(lastMessageTime(chat))
                : chat.time
            }
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
