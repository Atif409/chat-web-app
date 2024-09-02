import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInput = ({ message, handleInputChange, handleSendClick }) => {
  return (
    <>
      <div className="w-full flex flex-row p-4">
        <TextField
          variant="outlined"
          label="Type Your Message..."
          onChange={handleInputChange}
          value={message}
          sx={{
            width: "90%",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
              },
              "&:hover fieldset": {
                borderColor: "green",
              },
              "&.Mui-focused fieldset": {
                borderColor: "gray",
              },
            },
          }}
        />

        <Button
          variant="text"
          endIcon={<SendIcon />}
          size="small"
          onClick={handleSendClick}
        >
          Send
        </Button>
      </div>
    </>
  );
};

export default MessageInput;
