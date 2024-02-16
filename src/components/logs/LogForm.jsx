import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import InsertModal from "./InsertModal";
import { Box } from "@mui/material";

const LogForm = () => {
  const { control, handleSubmit, register, getValues, reset } = useForm();
  const [projects, setProjects] = useState([]);
  const [modules, setModules] = useState([]);
  const [addProject, setAddProject] = useState(false);
  const [addModule, setAddModule] = useState(false);
  const [moduleUrl, setModuleUrl] = useState("");
  // const url =c
  
  const fetchProjects = () => {
    axios
      .get(`${process.env.REACT_APP_URL}projects/v1/`)
      .then((res) => {
        // console.log(res.data.data);
        setProjects(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchModules = (projectId) => {
    axios
      .get(`${process.env.REACT_APP_URL}projects/v1/${projectId}/module`)
      .then((res) => {
        // console.log(res.data.data.modules);
        setModules(res.data.data.modules);
      });
  };
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(
        `${process.env.REACT_APP_URL}projects/v1/${data.project}/module/${data.module}`,
        {
          taskName: data.task,
          date: data.date,
          research: data.research,
          development: data.development,
          meeting: data.meeting,
        }
      )
      .then((res) => {
        console.log(res);
        reset([]);
      })
      .catch((err) => console.log(err));
  };

  const handleProjectChange = (e) => {
    // console.log(e.taget.value)
    setModuleUrl("projects/v1/" + e.target.value + "/module");
    console.log(e.target.value);
    fetchModules(e.target.value);
  };

  return (
    <>
      <div
        className="container mt-4 w-50 d-flex justify-content-center"
        // style={{ marginTop: "150px" }}
      >
        <form
          className="p-3 rounded-4 text-center"
          style={{ backgroundColor: "white", width: "500px" }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>Logs</h1>
          <div className="row mb-3">
            <div className="col-10">
              {/* <label className="form-label">Select Project</label> */}

              <select
                {...register("project")}
                onChange={handleProjectChange}
                className="form-select"
              >
                <option value="" selected disabled>
                  Select Project
                </option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="col-2"> */}
            <button
              type="button"
              className="btn btn-sm btn-primary col-2"
              onClick={() => setAddProject(true)}
              // style={{ height: "38px" }}
            >
              Add
            </button>
            <InsertModal
              setOpen={setAddProject}
              title="Project"
              open={addProject}
              handleModalSubmit={fetchProjects}
              url="projects/v1"
            />
            {/* </div> */}
          </div>

          <div className="row mb-3">
            <div className="col-10">
              {/* <label className="form-label">Select Module</label> */}
              <select {...register("module")} className="form-select">
                <option value="" selected disabled>
                  Select Module
                </option>
                {modules &&
                  modules.map((module) => (
                    <option key={module._id} value={module._id}>
                      {module.moduleName}
                    </option>
                  ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => {
                moduleUrl
                  ? setAddModule(true)
                  : alert("please select project to add module");
              }}
              className="btn btn-sm btn-primary col-2"
            >
              Add
            </button>
            <InsertModal
              setOpen={setAddModule}
              title="Module"
              open={addModule}
              handleModalSubmit={() => fetchModules(getValues("project"))}
              url={moduleUrl}
            />
          </div>
          <div className="row mb-3">
            <div className="col-8 ">
              {/* <label className="form-label mt-3">Task</label> */}
              {/* &nbsp;&nbsp; */}
              <input
                {...register("task")}
                type="text"
                className="form-control border border-2"
                placeholder="Enter Task"
              />
            </div>
            {/* <div > */}
            <input
              className="col-4 align-items-center"
              {...register("date")}
              type="date"
              placeholder="Enter Date"
              // className="mt-4"
            ></input>
            {/* </div> */}
          </div>
          <div className="row mb-3">
            <div className="col">
              {/* <label className="form-label">Research</label> */}
              <input
                {...register("research")}
                type="number"
                className="form-control"
                placeholder="Research"
              />
            </div>
            <div className="col">
              {/* <label className="form-label">Development</label> */}
              <input
                {...register("development")}
                type="number"
                className="form-control"
                placeholder="Development"
              />
            </div>
            <div className="col">
              {/* <label className="form-label">Meetings</label> */}
              <input
                {...register("meeting")}
                type="number"
                className="form-control"
                placeholder="Meetings"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
      <Box></Box>
    </>
  );
};

export default LogForm;
