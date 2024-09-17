import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { loginUser } from "../api/chatApi";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [emailLable, setEmailLable] = useState("Enter Your Email");
  const [passwordLable, setPasswordLable] = useState("Enter Your Password");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      if (!email) {
        setEmailLable("*Email can not be empty");
        return;
      } else if (!password) {
        setPasswordLable("*Password can not be empty");
        return;
      }
      const user = { email, password };
      const response = await loginUser(user);
      console.log(response);
      if (response) {
        const { token, userName, userId } = response;

        console.log("token", token);

        localStorage.setItem("authToken", token);
        localStorage.setItem("userName", userName);
        localStorage.setItem("userId", userId);

        setAlertMessage({ severity: "success", message: "Login Successful" });
        navigate("/app");
      } else {
        setAlertMessage({ severity: "error", message: "Login Failed" });
      }
    } catch (error) {
      console.log("Error logging in user:", error);
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
        Welcome Back!
      </Typography>

      <TextField
        variant="outlined"
        label={emailLable}
        onChange={handleEmailChange}
        value={email}
        type="email"
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
        label={passwordLable}
        onChange={handlePasswordChange}
        value={password}
        type="password"
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
        onClick={handleLogin}
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
        Login
      </Button>
      {alertMessage && (
        <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
      )}
      <Typography
        variant="body1"
        sx={{
          fontSize: {
            lg: "16px",
          },
          mb: 2,
        }}
      >
        Do not have an account?
        <Button
          sx={{
            fontSize: "16px",
          }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Typography>
    </Box>
  );
};

export default Login;
