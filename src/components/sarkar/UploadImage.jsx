import React, { useRef } from "react";
import axios from "axios";
import { Box } from "@mui/material";

function UploadImage() {
    const inputFile = useRef(null);
    const uploadImage = async(e) =>{
      try {
        const data = new FormData();
        data.append("profilePicture",e.target.files[0]);
        const res = await axios.post(`${process.env.REACT_APP_URL}image/v1/upload`,data)
        alert("image uploaded");
        // console.log(res); 
        if (inputFile.current) {
          inputFile.current.value = "";
          inputFile.current.type = "text";
          inputFile.current.type = "file";
      }
      } catch (error) {
        console.log(error)
        if (inputFile.current) {
          inputFile.current.value = "";
          inputFile.current.type = "text";
          inputFile.current.type = "file";
      }
        alert("error in uploading the image");
      }
        
    }
  return (
    <Box width={"100%"}>
      <h3 style={{color:"#002b5b"}}>Please Upload Image</h3>
      <input  type="file" ref={inputFile} onChange={uploadImage}/>
    </Box>
  );
}

export default UploadImage;
