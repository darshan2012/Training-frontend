import { Button } from '@mui/material'
import { Link as LinkRoute } from 'react-router-dom'
import React from 'react'

function Back() {
  return (
    <>
        <Button className='btn m-2'  variant='contained' LinkComponent={LinkRoute} to={'/'}  >Back</Button>
    </>
  )
}   
export default Back