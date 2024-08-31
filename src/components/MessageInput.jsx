import { useState } from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    console.log("Message sent:", message);
    setMessage(""); // Clear the input field after sending
  };

  return (
    <>
    
        <div className="w-full flex flex-row p-4">
          <TextField
            variant="outlined"
            label="Type Your Message..."
     
          onChange={handleInputChange}
          sx={{
            width: '90%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'gray', // Change border color here
              },
              '&:hover fieldset': {
                borderColor: 'green', // Change border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'gray', // Change border color when focused
              },
            },
          }}
        

          />
 
 <Button variant="text" endIcon={<SendIcon />} size="small" onClick={handleSendClick} >
  Send
</Button>
        </div>
  
    </>
  );
};

export default MessageInput;
