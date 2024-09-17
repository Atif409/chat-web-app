import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#dadada",
      }}
    >
      <Button
        variant="contained"
        sx={{
          margin: "4px",
          width: "30%",
        }}
        onClick={() => navigate("/register")}
      >
        Register
      </Button>
      <Button
        variant="contained"
        sx={{
          margin: "4px",
          width: "30%",
        }}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </Box>
  );
};

export default Welcome;
