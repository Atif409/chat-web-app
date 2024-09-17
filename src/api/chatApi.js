import axios from "axios";
import { generateToken } from "../utils/genrateToken";
const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    const users = response.data;

    const existingUser = users.find((user) => user.email === userData.email);

    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    const registerResponse = await axios.post(`${API_URL}/users`, userData);
    return registerResponse.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    const users = response.data;

    const user = users.find(
      (u) => u.email === userData.email && u.password === userData.password
    );
    if (user) {
      const token = generateToken();
      return {
        token,
        userName: user.name,
        userId: user.id,
      };
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("error fetching users:", error);
    throw error;
  }
};

export const getChats = async () => {
  try {
    const response = await axios.get(`${API_URL}/chats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};
export const getChatById = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/chats/${chatId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching chat with ID ${chatId}:`, error);
    throw error;
  }
};
export const createChat = async (chatData) => {
  try {
    const response = await axios.post(`${API_URL}/chats`, chatData);
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};
export const fetchMessages = async (chatId) => {
  try {
    const chat = await getChatById(chatId);
    return chat.messages;
  } catch (error) {
    console.error(`Error fetching messages for chat with ID ${chatId}:`, error);
    throw error;
  }
};
export const sendMessageToChat = async (chatId, message) => {
  try {
    const chat = await getChatById(chatId);
    chat.messages.push(message);
    const response = await axios.put(`${API_URL}/chats/${chatId}`, chat);
    return response.data;
  } catch (error) {
    console.error(`Error sending message to chat with ID ${chatId}:`, error);
    throw error;
  }
};
