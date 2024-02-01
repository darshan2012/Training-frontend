import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { months } from "./months";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: true,
  minBarThickness: 90,
  maxBarThickness: 180,
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Company",
        color: "#000",
        font: {
          size: 18,
          weight: "bold",
          lineHeight: 1.2,
        },
        padding: { top: 20, left: 0, right: 0, bottom: 0 },
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Total Working Hours",
        color: "#000",
        font: {
          size: 18,
          // style: "normal",
          weight: "bold",
          lineHeight: 1.2,
        },
        padding: { top: 30, left: 0, right: 0, bottom: 0 },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },

    xyAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "probability",
        },
      },
    ],
  },
};

export default function BarChart() {
  const [data, setData] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [month, setMonth] = useState("");

  const fetchDistricts = async (stateId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}districts/v1/get-districts-by-state/${stateId}`
      );
      setDistricts(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStates = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}states/v1/`);
      setStates(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    const apiUrl = generateApiUrl();
    try {
      const res = await axios.get(apiUrl, {
        headers: { Authorization: localStorage.getItem("jwttoken") },
      });
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const generateApiUrl = () => {
    let apiUrl = `${process.env.REACT_APP_URL}analysis/v1?`;
    if (month) apiUrl += `month=${month}&`;
    if (state){
      apiUrl += `state=${state}&`;
      if (district) apiUrl += `district=${district}&`;
    } 
    return apiUrl;
  };

  const handleChange = (event, field) => {
    const value = event.target.value;
    switch (field) {
      case "state":
        setState(value);
        fetchDistricts(value);
        break;
      case "district":
        setDistrict(value);
        break;
      case "month":
        setMonth(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, state, district]);

  useEffect(() => {
    fetchStates();
  }, []);

  const handleReset = () => {
    setState("");
    setDistrict("");
    setMonth("");
  };
  const chartData = {
    labels: data.map((record) => record.company.companyname),
    datasets: [
      {
        label: "Total Working Hours",
        data: data.map((record) => record.hours),
        backgroundColor: "#018B8D",
        borderColor: "#018B8D",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      className="box-shadow p-3 col-lg-7 col-12"
      mt={5}
      mb={5}
      sx={{
        height: "auto",
        // width: "50%",
      }}
    >
      <h3 className="mb-4">Total Working hours by company</h3>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="state">State</InputLabel>
            <Select
              // className="box-shadow border-0 outline-0"
              // sx={{outline:'none'}}
              name="state"
              onChange={(e) => handleChange(e, "state")}
              value={state}
              label="State"
              id="state"
            >
              {states.map((state) => (
                <MenuItem key={state._id} value={state._id}>
                  {state.statename}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="district">District</InputLabel>
            <Select
              value={district}
              onChange={(e) => handleChange(e, "district")}
              label="District"
              id="district"
              name="district"
            >
              {districts.map((district) => (
                <MenuItem key={district._id} value={district._id}>
                  {district.districtname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth>
            <InputLabel htmlFor="month">Months</InputLabel>
            <Select
              required
              value={month}
              onChange={(e) => handleChange(e, "month")}
              label="Month"
              id="month"
              name="month"
            >
              {months.map((month, index) => (
                <MenuItem key={index} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid mt={1} item xs={6} sm={3}>
          <Button
            className="btn"
            // color="error"
            sx={{
              backgroundColor: "#EBA50A",
              ":hover": { backgroundColor: "#EBA50A" },
            }}
            onClick={handleReset}
            variant="contained"
          >
            reset
          </Button>
        </Grid>
      </Grid>
      {data.length > 0 ? (
        <Bar options={options} data={chartData} />
      ) : (
        <Typography mt={6} variant="body1" color="textSecondary" align="center">
          No data available for the selected filters.
        </Typography>
      )}
    </Box>
  );
}
