import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

const LogForm = () => {
  const { control, handleSubmit, register } = useForm();
  const [projects, setProjects] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}projects/v1/`)
      .then((res) => {
        // console.log(res.data.data);
        setProjects(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const fetchModules = (projectId) => {
    axios
      .get(`${process.env.REACT_APP_URL}projects/v1/${projectId}/module`)
      .then((res) => {
        console.log(res.data.data.modules);
        setModules(res.data.data.modules);
      });
  };
  const onSubmit = (data) => {
    console.log(data); // You can perform form submission logic here
  };

  const handleProjectChange = (e) => {
    // console.log(e.taget.value)
    fetchModules(e.target.value);
  };

  return (
    <div
      className="container mt-5 w-50 d-flex justify-content-center"
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
            className="btn btn-sm btn-primary col-2"
            // style={{ height: "38px" }}
          >
            Add
          </button>
          {/* </div> */}
        </div>

        <div className="row mb-3">
          <div className="col-10">
            {/* <label className="form-label">Select Module</label> */}
            <select {...register("module")} className="form-select">
              <option value="" selected disabled>
                Select Project
              </option>
              {modules &&
                modules.map((module) => (
                  <option key={module._id} value={module._id}>
                    {module.moduleName}
                  </option>
                ))}
            </select>
          </div>
          <button className="btn btn-sm btn-primary col-2">Add</button>
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
            <label className="form-label">Research</label>
            <input
              {...register("research")}
              type="number"
              className="form-control"
              placeholder="Research"
            />
          </div>
          <div className="col">
            <label className="form-label">Development</label>
            <input
              {...register("development")}
              type="number"
              className="form-control"
              placeholder="Development"
            />
          </div>
          <div className="col">
            <label className="form-label">Meetings</label>
            <input
              {...register("meetings")}
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
  );
};

export default LogForm;
