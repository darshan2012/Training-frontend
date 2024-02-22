import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const badgeStyle = {
  display: "flex",
  alignItems: "center",
};

const rmdBadgeStyle = {
  ...badgeStyle,
  justifyContent: "center",
};

export default function LogsTable() {
  const [expandedProject, setExpandedProject] = useState("");
  const [expandedModule, setExpandedModule] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}projects/v1/getDataWithHours`)
      .then((res) => {
        setProjects(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChangeProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? "" : projectId);
  };

  const handleChangeModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? "" : moduleId);
  };

  const renderTaskList = (tasks) => {
    let totalResearch = 0;
    let totalMeeting = 0;
    let totalDevelopment = 0;

    return (
      <List dense>
        {tasks.map((task, index) => {
          totalResearch += task.research;
          totalMeeting += task.meeting;
          totalDevelopment += task.development;

          return (
            <ListItem key={index}>
              <ListItemText primary={task.taskName} />
              <ListItemSecondaryAction>
                <Box sx={badgeStyle}>
                  <Badge color="primary" badgeContent={task.research || "0"}>
                    R
                  </Badge>
                  <Badge
                    color="success"
                    badgeContent={task.meeting || "0"}
                    sx={{ mx: 1 }}
                  >
                    M
                  </Badge>
                  <Badge color="warning" badgeContent={task.development || "0"}>
                    D
                  </Badge>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <Box mt={5} mb={5}>
      {projects.map((project) => (
        <Accordion
          key={project._id}
          expanded={expandedProject === project._id}
          onChange={() => handleChangeProject(project._id)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h6">{project._id}</Typography>
              <Box sx={{ ...rmdBadgeStyle }}>
                <Badge
                  color="primary"
                  badgeContent={project.projectResearchTotal || "0"}
                >
                  R
                </Badge>
                <Badge
                  color="success"
                  badgeContent={project.projectMeetingTotal || "0"}
                  sx={{ mx: 1 }}
                >
                  M
                </Badge>
                <Badge
                  color="warning"
                  badgeContent={project.projectDevelopmentTotal || "0"}
                >
                  D
                </Badge>
              </Box>
              <Box>Total Hours: {project.projectTotal || "0"}</Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {project.modules.map((module) => (
              <Accordion
                key={module.moduleName}
                expanded={expandedModule === module.moduleName}
                onChange={() => handleChangeModule(module.moduleName)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Typography variant="subtitle1">
                      {module.moduleName}
                    </Typography>

                    <Box sx={{ ...rmdBadgeStyle }}>
                      <Badge
                        color="primary"
                        badgeContent={module.moduleResearchTotal || "0"}
                      >
                        R
                      </Badge>
                      <Badge
                        color="success"
                        badgeContent={module.moduleMeetingTotal || "0"}
                        sx={{ mx: 1 }}
                      >
                        M
                      </Badge>
                      <Badge
                        color="warning"
                        badgeContent={module.moduleDevelopmentTotal || "0"}
                      >
                        D
                      </Badge>
                    </Box>
                    <Box>Total Hours: {module.moduleTotal || "0"} </Box>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {module.tasks.length > 0 ? (
                    renderTaskList(module.tasks)
                  ) : (
                    <Typography>No tasks found</Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
