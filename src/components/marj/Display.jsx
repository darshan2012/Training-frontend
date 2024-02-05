import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkDetailsTable from './WorkDetailsTable';
import BarChart from './BarChart';
import { Box } from '@mui/material';


const Display = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const verifyToken = async () => {
        const token = localStorage.getItem("jwttoken");
        if (!token) {
          navigate("/user/login");
        } else {
          // console.log(baseurl)
          await axios
            .get(`${process.env.REACT_APP_URL}users/v1/verify-token`, {
              headers: { Authorization: localStorage.getItem("jwttoken") },
            })
            .then((data) => {
              setIsAuthenticated(true)
            })
            .catch((err) => {
              navigate("/user/login/");
            });
        }
      };
      useEffect(() => {
        // Fetch data from the backend
        verifyToken();
      }, []);
      // console.count();
    return (
        <>
        {isAuthenticated && 
        <Box className=' d-flex flex-column justify-content-center align-items-center'>
            <WorkDetailsTable />
            <BarChart />
            
        </Box>
            
        }
        </>
    );
};

export default Display;