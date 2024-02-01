import React, { useRef, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

function UploadImage() {
  const [image, setImage] = useState("");
  const inputFile = useRef(null);

  const uploadImage = async (e) => {
    try {
      const data = new FormData();
      data.append("profilePicture", e.target.files[0]);
      const res = await axios.post(
        `${process.env.REACT_APP_URL}image/v1/upload`,
        data
      );
      alert("image uploaded");
      // console.log(res.data.output)
      setImage(res.data.output)
      // console.log(res);
      if (inputFile.current) {
        inputFile.current.value = "";
        inputFile.current.type = "text";
        inputFile.current.type = "file";
      }
    } catch (error) {
      console.log(error);
      if (inputFile.current) {
        inputFile.current.value = "";
        inputFile.current.type = "text";
        inputFile.current.type = "file";
      }
      alert("error in uploading the image");
    }
  };
  return (
    <Box width={"100%"}>
      <h3 style={{ color: "#002b5b" }}>Please Upload Image</h3>
      <input type="file" ref={inputFile} onChange={uploadImage} />
      {image && (
        <Box mt={3}>
          <p className="text-success">Image Uploaded Succesfully!</p>
          <img
            className="m-4"
            src={"data:" + image.type + ";base64," + image.imageBase64}
            style={{ maxHeight: "300px", maxWidth: "400px" }}
          />
        </Box>
      )}
    </Box>
  );
}

export default UploadImage;
