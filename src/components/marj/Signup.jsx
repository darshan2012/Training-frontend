import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Form, useForm } from "react-hook-form";
import axios from "axios";
import { Link as RouteLink, useNavigate } from "react-router-dom";
// import { ToastContainer, Toast } from "react-bootstrap";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    trigger,
    clearErrors
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post(`${process.env.REACT_APP_URL}users/v1/`, data)
      .then((res) => {
        console.log(res.data);
        // alert("Success " + res.data.firstname)
        toast.success("Regestration Successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(navigate("/user/login"), 2000);
      })
      .catch((err) => {
        // console.log("here");
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };
  // console.log(process.env.REACT_APP_URL)
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const fetchCompanies = async (district) => {
    // console.log(district)
    let url = `${process.env.REACT_APP_URL}companies/v1/`;
    if (district) url += "?district=" + district;
    // console.log("here",url)
    await axios
      .get(url)
      .then((res) => setCompanies(res.data.data))
      .catch((err) => console.log(err));
  };

  const fetchStates = async () => {
    const url = process.env.REACT_APP_URL;
    await axios
      .get(url + "states/v1/")
      .then((res) => setStates(res.data.data))
      .catch((err) => console.log(err));
  };

  const fetchDistricts = async (stateid) => {
    await axios
      .get(
        `${process.env.REACT_APP_URL}districts/v1/get-districts-by-state/${stateid}`
      )
      .then((res) => setDistricts(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStates();
    // fetchCompanies();
  }, []);

  const handleStateChange = async (event) => {
    const selectedState = event.target.value;
    // console.log(event)
    // setValue("state", selectedState); // Update the form value
    clearErrors("state")
    fetchDistricts(selectedState);
    
  };

  const handleDistrictChange = async (event) => {
    const district = event.target.value;
    // console.log(event)
    // setValue("state", selectedState); // Update the form value
    fetchCompanies(district);
    clearErrors('district')
  };
  
  const handleCompanyChange = async (event) => {
    // const selectedState = event.target.value;
    // console.log(event)
    // setValue("state", selectedState); // Update the form value
    clearErrors("company")
    // fetchDistricts(selectedState);
    
  };
  // console.count();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ width: "40%" }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  {...register("firstname", {
                    required: "First Name cannot be empty",
                  })}
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
                {errors.firstname && (
                  // <DisplayError err={errors.firstname.message} />
                  <p className="text-danger">{errors.firstname.message}</p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  {...register("lastname", {
                    required: "Last Name cannot be empty",
                  })}
                  label="Last Name"
                  autoComplete="family-name"
                />
                {errors.lastname && (
                  <p className="text-danger">{errors.lastname.message}</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("username", {
                    required: "Username cannot be empty",
                  })}
                  id="username"
                  label="Username"
                  name="username"
                />
                {errors.username && (
                  <p className="text-danger">{errors.username.message}</p>
                )}
              </Grid>
              <Grid item xs={12}> 
                <FormControl margin="normal" fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password field is required",
                      minLength:"Password should be of minimum Eight characters",

                      pattern: {
                        value:
                          "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
                        message:
                          "Password should be of Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                      },
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {errors.password && (
                  
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Grid>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  {...register("password", {
                    required: "Password field is required",
                    pattern: {
                      value:
                        "/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/",
                      message:
                        "Password should be of Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                    },
                  })}
                  type="password"
                  label="Password"
                  id="password"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Grid> */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="male"
                      {...register("gender", {
                        required: "This is a required field",
                      })}
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      {...register("gender", {
                        required: "This is a required field",
                      })}
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      {...register("gender", {
                        required: "This is a required field",
                      })}
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                  {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="state">State</InputLabel>
                  <Select
                    {...register("state", {
                      required: "This is a required field",
                    })}
                    onChange={handleStateChange}
                    label="State"
                    id="state"
                  >
                    {/* {console.log(states)} */}
                    {states.map((state) => (
                      <MenuItem key={state._id} value={state._id}>
                        {state.statename}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && <p className="text-danger">{errors.state.message}</p>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="district">District</InputLabel>
                  <Select
                    {...register("district", {
                      required: "This is a required field",
                    })}
                    required
                    label="District"
                    id="district"
                    // disabled
                    onChange={handleDistrictChange}
                  >
                    {districts.map((district) => (
                      <MenuItem key={district._id} value={district._id}>
                        {district.districtname}
                      </MenuItem>
                    ))}
                    
                  </Select>
                  {errors.district && <p className="text-danger">{errors.district.message}</p>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="company">Company</InputLabel>
                  <Select
                    required
                    label="Company"
                    id="company"
                    {...register("company", {
                      required: "This is a required field",
                    })}
                    onChange={handleCompanyChange}
                  >
                    {companies.map((company) => (
                      <MenuItem key={company._id} value={company._id}>
                        {company.companyname}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.company && <p className="text-danger">{errors.company.message}</p>}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  <RouteLink to={"/user/login"}>
                    Already have an account? Sign in
                  </RouteLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
    </ThemeProvider>
  );
}
