import { TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// eslint-disable-next-line react/prop-types
const MessageInput = ({ message, handleInputChange, handleSendClick }) => {
  return (
    <>
      <Box component="section" sx={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
      }}>
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
      </Box>
    </>
  );
};

export default MessageInput;
