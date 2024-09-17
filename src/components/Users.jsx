/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Typography } from "@mui/material";

const Users = ({avatar, name, onClick, btnTitle, btnIcon}) => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        cursor: "pointer",
        p: 1,
        "&:hover": {
          bgcolor: "grey.100",
          borderRadius: "12px",
        },
        justifyContent: "space-between",
      }}
    >
      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar src={avatar} sx={{ width: 50, height: 50 }} alt={name} />
        <Typography variant="h5">{name}</Typography>
      </Box>

      <Button
        startIcon={btnIcon}
        sx={{
          width: "30%",
          border: " 2px solid #000000",
          color: "#000000",
          borderRadius: "20px",
          "&:hover": {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
        }}
        onClick={onClick}

      >
      {btnTitle}
      </Button>
    </Box>
  );
};

export default Users;
