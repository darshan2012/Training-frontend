import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays, format, subYears } from "date-fns";
import LogsTable from "./LogsTable";

function Analysis() {
  const [data, setData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modules, setModules] = useState([]);
  const [project, setProject] = useState("");
  const [module, setModule] = useState("");
  const [state, setState] = useState([
    {
      startDate: subYears(new Date(), 1),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchData();
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchData();
  }, [project, module, state]);

  const generateApiUrl = () => {
    let apiUrl = `${process.env.REACT_APP_URL}projects/v1/analysis?`;
    if (project) apiUrl += `project=${project}&`;
    if (module) apiUrl += `module=${module}&`;
    if (state[0].startDate) {
      const date = format(state[0].startDate, "yyyy-MM-dd");
      apiUrl += `startDate=${date}&`;
    }
    if (state[0].endDate) {
      const date = format(state[0].endDate, "yyyy-MM-dd");
      apiUrl += `endDate=${date}&`;
    }
    return apiUrl;
  };
  const fetchData = () => {
    let url = generateApiUrl();
    axios
      .get(url)
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchProjects = () => {
    axios
      .get(`${process.env.REACT_APP_URL}projects/v1/`)
      .then((res) => {
        // console.log(res.data.data);
        setProjects(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const fetchModules = (projectId) => {
    axios
      .get(`${process.env.REACT_APP_URL}projects/v1/${projectId}/module`)
      .then((res) => {
        console.log("here");
        // console.log(res.data.data.modules);
        setModules(res.data.data.modules);
        // console.log("before", module);
        setModule("");
        // console.log("after", module);
      });
  };
  const handleChange = (event, field) => {
    const value = event.target.value;
    switch (field) {
      case "project":
        setProject(value);

        fetchModules(value);
        break;
      case "module":
        setModule(value);
        break;
    }
  };

  const chartData = {
    labels: ["Research", "Development", "Meeting"],
    datasets: [
      {
        label: ["No of Hours"],
        data: [
          data[0]?.totalResearch,
          data[0]?.totalDevelopment,
          data[0]?.totalMeeting,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
        ],
        borderWidth: 1,
      },
    ],
  };
  //   console.log(chartData);
  function handleSelect(date) {
    console.log(date); // native Date object
  }

  return (
    <Box>
      <LogsTable />
      <Box margin={"4px"} className="row" gap={3} maxWidth={"30%"}>
        <FormControl className="col" fullWidth>
          <InputLabel htmlFor="project">Project</InputLabel>
          <Select
            name="project"
            id="project"
            value={project}
            label="project"
            onChange={(e) => handleChange(e, "project")}
          >
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="col" fullWidth>
          <InputLabel htmlFor="module">Module</InputLabel>
          <Select
            name="module"
            id="module"
            value={module}
            label="module"
            onChange={(e) => handleChange(e, "module")}
          >
            {modules.map((module) => (
              <MenuItem key={module._id} value={module._id}>
                {module.moduleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          className="col"
          onClick={() => setShowDatePicker((prew) => !prew)}
        >
          PickDate
        </Button>
      </Box>
      {showDatePicker && (
        <DateRangePicker
          onChange={(item) => {
            setState([item.selection]);
          }}
          //   dateDisplayFormat={"yyyy-MM-dd"}
          maxDate={new Date()}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="vertical"
          //   scroll={{ enabled: true }}
        />
      )}
      <Box width={{ md: "30%", xs: "100%" }}>
        {data.length !== 0 ? (
          <PieChart data={chartData} />
        ) : (
          <p className="m-5 text-info ">
            No date available on the provided filter
          </p>
        )}
      </Box>
    </Box>
  );
}

export default Analysis;
