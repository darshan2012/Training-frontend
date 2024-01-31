import React from 'react'
import { Outlet } from 'react-router-dom'
import Back from '../Back'


function UserHome() {
  return (
    <>
        
        <Outlet />
    </>
  )
}

export default UserHome