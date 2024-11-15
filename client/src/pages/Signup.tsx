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
import { signup } from "../api/authAPI";
import { UserSignup } from "../interfaces/UserSignup";
import { useCookies } from "react-cookie";
const Signup = () => {
  const [userFormData, setUserFormData] = useState<UserSignup>({
    username: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [_cookies, setCookies] = useCookies(["token", "user"]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signup(userFormData);
      console.log(data);
      setCookies("token", data.token, { path: "/", maxAge: 600000 });
      setCookies("user", data.user, { path: "/", maxAge: 600000 });
      Auth.login(data.token);
      setShowAlert(false); // Hide alert if signup is successful
      setUserFormData({ username: "", password: "" });
    } catch (err) {
      console.error("Signup failed", err);
      setShowAlert(true); // Show alert if signup fails
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Typography variant='h5' align='center'>
          Sign Up
        </Typography>
        {showAlert && (
          <Alert severity='error' onClose={() => setShowAlert(false)}>
            Something went wrong with your signup!
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
            value={userFormData.username}
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
            value={userFormData.password}
            onChange={handleChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={!userFormData.username || !userFormData.password}
            style={{ marginTop: "16px" }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
