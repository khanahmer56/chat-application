import React, { useState } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useInputValidation } from "6pp";

const AdminLogin = () => {
  const secretKey = useInputValidation("");
  const handleLogin = (e) => {};

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
        <Typography>Admin Login</Typography>
        <form
          style={{ width: "100%", marginTop: "1rem" }}
          onSubmit={handleLogin}
        >
          <TextField
            label={"Password"}
            type="password"
            required
            fullWidth
            margin="normal"
            variant="outlined"
            value={secretKey.value}
            onChange={secretKey.changeHandler}
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
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
