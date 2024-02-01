import React from "react";
import RandomImage from "./RandomImage";
import UploadImage from "./UploadImage";
import { Container } from "@mui/material";

function ImageRoot() {
  return (
    <Container sx={{height:"500px"}} className="box-shadow p-5 d-flex justify-content-center align-items-start">
      <UploadImage />
      <RandomImage />
    </Container>
  );
}

export default ImageRoot;
