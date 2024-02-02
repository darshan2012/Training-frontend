import React, { useReducer, useRef, useState } from "react";
import Container from '@mui/material/Container';

import axios from "axios";
import { Button, Box, CircularProgress, Paper, TextField } from "@mui/material";

function ChatAssist() {
    const promptRef = useRef();
    const [response,setResponse] = useState("");
    const [err,setErr] = useState("")
    console.count();
    const handleSubmit = async() => {
      try{
        const res = await axios.post(`${process.env.REACT_APP_URL}openai/v1`,{
          prompt: promptRef.current.value
        })
        // console.log(promptRef.current.value);
        // console.log(res.data[0].message.content);
        setResponse(prew => prew = res.data[0].message.content)
      }
      catch(err){
        console.log(err)
        if(err.response.data.status == 500)
        setErr("OpneAI api not working")
      }
        
    }
  return (
    <Container>
      <Box height={600}  mt={5} sx={{ boxShadow: 2 }}>
        <div className="d-flex ">
          <img className="m-3 image-fluid" src='https://freelogopng.com/images/all_img/1681142503openai-icon-png.png' height="50px"  />
          <h1 style={{fontFamily:"Oswald",color:"#10A37F"}} className="mt-3">OpenAI Assitance</h1>
        </div>
        <TextField className="m-3" sx={{width:"97%"}}  inputRef={promptRef}  rows={4} multiline placeholder="Enter the prompt" size="medium"  variant="standard"  />
        <Button onClick={handleSubmit} sx={{backgroundColor:"#10A37F"}} color="success"  variant="contained" fullWidth className="mt-1"  >generate response</Button>
        {/* <h2 style={{fontFamily:"Oswald"}} className="b">response</h2> */}
        {response && <p className="m-4" style={{fontFamily:"Oswald"}}>{response}</p>}
      {err && <p className="m-3 text-center text-danger">{err}</p>}
      </Box>
      {/* <input ref={promptRef} className="prompt" type="text" />
      <button className="submit-prompt" onClick={handleSubmit}><img src='https://static.vecteezy.com/system/resources/previews/021/495/993/original/chatgpt-openai-logo-icon-free-png.png' height="30px" width="100px" /></button>
      {response && <p>{response}</p>} */}
    </Container>
  );
}

export default ChatAssist;
