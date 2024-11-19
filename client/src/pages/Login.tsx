import { useState, FormEvent, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Alert,
} from "@mui/material";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";
import { useCookies } from "react-cookie";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [_cookies, setCookies] = useCookies(["token", "user"]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      setCookies("token", data.data.token, { path: "/", maxAge: 600000 });
      setCookies("user", data.data.user, { path: "/", maxAge: 600000 });
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
      setShowAlert(true); // Show alert if login fails
    }
  };

  return (
    <Container component='main' maxWidth='laptop'>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant='h5' align='center'>
          Login
        </Typography>
        {showAlert && (
          <Alert severity='error' onClose={() => setShowAlert(false)}>
            Failed to login. Please check your credentials and try again.
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Username'
            name='username'
            value={loginData.username}
            onChange={handleChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            name='password'
            type='password'
            value={loginData.password}
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={!loginData.username || !loginData.password}
            style={{ marginTop: "16px" }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
