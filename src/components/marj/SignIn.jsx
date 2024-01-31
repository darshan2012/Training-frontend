import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { appendErrors, Form, useForm } from "react-hook-form";
import axios from "axios";
import { Link as RouteLink, useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post(`${process.env.REACT_APP_URL}users/v1/login`, data)
      .then((res) => {
        // console.log(res.data)
        // alert("Success " + res.data)
        localStorage.setItem("jwttoken", res.data.data.token);
        navigate("/user");
      })
      .catch((err) => {
        console.log(err);
        // console.log(errors);
        setError("root.serverError", {
          type: 400,
          message: err.response.data.message,
        });
        // setLoginError(err.response.data.message)
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            marginBottom: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              {...register("username", {
                required: "username cannot be empty",
              })}
              label="Username"
              autoFocus
            />
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("password", {
                required: "password field is required",
                pattern: {
                  value:
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
                  message:
                    "Password should be of Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                },
              })}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
            {
              errors?.root?.serverError?.type > 300 && <p className="text-danger">{errors.root.serverError.message}</p>
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  <RouteLink to={"/user/signup"}>
                    {"Don't have an account? Sign Up"}
                  </RouteLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
