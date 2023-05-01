import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { logoutUser } from '../features/user/userslice'
import { useLogoutMutation } from '../features/api/apiSlice'
import { addError } from '../features/error/errorSlice'


const Nav = () => {

const user = useSelector(state=>state.user)
const path = useLocation().pathname
const dispatch = useDispatch()
const[logout,{isSuccess,isError,error}] = useLogoutMutation()

useEffect(() => {
  if(isError){
    const errorData = {
      status_code: error.status,
      message: error.data.detail
    }
    dispatch(addError(errorData))
  }
}, [isError])

const onClick = async (e)=>{
  e.preventDefault()
  await logout(user.usertoken)

  if(isSuccess){
    dispatch(logoutUser()) 
  }

 
 
  
}

  return (
      <nav className="navs">
        {user.logedin?
        <NavLink onClick={onClick} >Logout</NavLink>: path !='/login'?
        <NavLink to="login">Login</NavLink>: ''}
    </nav>
  
  )
}

export default Nav
