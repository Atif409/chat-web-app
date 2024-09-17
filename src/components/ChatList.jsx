import { Avatar, Box, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
const ChatList = ({ avatar, name, msg, time, onClick, selected }) => {
  return (
    <Box
      component="div"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "row",
        gap: 2,
        cursor: "pointer",
        bgcolor: selected ? "grey.200" : "transparent",
        "&:hover": {
          bgcolor: "grey.100",
        },
      }}
      onClick={onClick}
    >
      <Avatar
        alt={name}
        src={avatar}
        sx={{
          width: 50,
          height: 50,
          border: "2px solid",
          borderColor: "grey.400",
        }}
      />
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
        }}
      >
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {msg}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {time}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatList;
