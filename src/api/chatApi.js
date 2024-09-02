import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getChats = async ()=>{
    try{
        const response = await axios.get(`${API_URL}/chat`);
        return response.data;
    }
    catch(error){
        console.error('error fetching chats:', error);
        throw error;
    }
}

