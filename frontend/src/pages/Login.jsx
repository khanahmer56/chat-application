import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { VisuallyHiddenInput } from "../components/style/Styleomponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { passwordValidator, userNameValidator } from "../utils/validator";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const name = useInputValidation("");
  const bio = useInputValidation();
  const username = useInputValidation("", userNameValidator);
  const password = useStrongPassword(passwordValidator);
  const avatar = useFileHandler("single");
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username.value, password.value);
  };
  const handleSignup = (e) => {
    e.preventDefault();
    console.log(name.value, bio.value, username.value, password.value);
  };
  return (
    <Container
      component={"main"}
      maxWidth={"sm"}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography>Login</Typography>
            <form
              style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={handleLogin}
            >
              <TextField
                label={"UserName"}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              {username.error && (
                <Typography color={"red"} variant="caption">
                  {username.error}
                </Typography>
              )}
              <TextField
                label={"Password"}
                type="password"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              {password.error && (
                <Typography color={"red"} variant="caption">
                  {password.error}
                </Typography>
              )}
              <Button
                sx={{
                  marginTop: "1rem",
                  width: "100%",
                }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </form>
            <Typography textAlign={"center"} m={"1rem"}>
              Or
            </Typography>
            <Button
              sx={{
                marginTop: "1rem",
              }}
              color="primary"
              fullWidth
              type="submit"
              onClick={() => setIsLogin(false)}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Typography>Sign Up</Typography>
            <form
              style={{ width: "100%", marginTop: "1rem" }}
              onSubmit={handleSignup}
            >
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
                  src={avatar.preview}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput
                      type="file"
                      onChange={avatar.changeHandler}
                    />
                  </>
                </IconButton>
              </Stack>

              <TextField
                label={"Name"}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                label={"UserName"}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                label={"Bio"}
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                label={"Password"}
                type="password"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                sx={{
                  marginTop: "1rem",
                  width: "100%",
                }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <Typography textAlign={"center"} m={"1rem"}>
              Or
            </Typography>
            <Button
              sx={{
                marginTop: "1rem",
              }}
              color="primary"
              fullWidth
              type="submit"
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
