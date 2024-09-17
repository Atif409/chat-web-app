import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { registerUser } from "../api/chatApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleRegister = async () => {
    try {
      const newUser = { name, email, password };
    const response =   await registerUser(newUser);
    console.log(response);
    if(response){
      console.log("User registered successfully");
      navigate("/login");
    }
    else{
      console.log("User registration failed");
    }
     
    } catch (error) {
      console.log("Error registering user:", error);
    }
  };
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
        gap: "12px",
        textAlign: "center",
      }}
    >

      <Box>

        
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: "24px",
            sm: "28px",
            md: "32px",
            lg: "36px",
          },
          mb: 2,
        }}
      >
        Please Register Your Account
      </Typography>

      <TextField
        variant="outlined"
        label="Enter Your Name"
        onChange={handleNameChange}
        value={name}
        sx={{
          width: {
            xs: "90%",
            sm: "80%",
            md: "60%",
            lg: "50%",
          },
          maxWidth: "360px",
        }}
      />
      <TextField
        variant="outlined"
        label="Enter Your Email"
        onChange={handleEmailChange}
        value={email}
        sx={{
          width: {
            xs: "90%",
            sm: "80%",
            md: "60%",
            lg: "50%",
          },
          maxWidth: "360px",
        }}
      />
      <TextField
        variant="outlined"
        label="Enter Your Password"
        onChange={handlePasswordChange}
        value={password}
        sx={{
          width: {
            xs: "90%",
            sm: "80%",
            md: "60%",
            lg: "50%",
          },
          maxWidth: "360px",
        }}
      />
      <Button
        variant="contained"
        onClick={handleRegister}
        sx={{
          width: {
            xs: "100%",
            sm: "80%",
            md: "60%",
            lg: "200px",
          },
          maxWidth: "200px",
          borderRadius: "20px",
        }}
      >
        Register
      </Button>

      <Typography
        variant="body1"
        sx={{
          fontSize: {
            lg: "16px",
          },
          mb: 2,
        }}
      >
        Already have an Account?
        <Button
          sx={{
            fontSize: "16px",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </Typography>
    </Box>
  );
};

export default Register;
