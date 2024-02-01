import React, { useState } from "react";
import axios from 'axios';
import { Button, Container } from "@mui/material";



function RandomImage() {
    const [randomImg, setRandomImg] = useState("");
    const generateRandomImage = () => {
      setRandomImg("");
      axios.get(`${process.env.REACT_APP_URL}image/v1`)
      .then(res=>{
        // console.log(res.data.data[0]);
        setRandomImg(res.data.data[0])
      })  
      .catch((err)=>{console.log(err)})
    }
  return( 
  <Container>
    <Button className="btn m-3 d-block bg-success"  variant="contained"  onClick={generateRandomImage}>generate-random-image</Button>
    
    {randomImg ?
      <img className="m-4" src={'data:'+ randomImg.type +';base64,' + randomImg.imageBase64} style={{maxHeight:"350px",maxWidth:"400px"}} />
    :
    <div style={{height: "350px",width:"400px"}}></div> 
    }
    </Container>);
}

export default RandomImage;
