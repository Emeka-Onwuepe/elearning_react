import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

const Nav = () => {
const user = useSelector(state=>state.user)
const path = useLocation().pathname
  return (
      <nav className="navs">
        {user.logedin?
        <NavLink >Logout</NavLink>: path !='/login'?
        <NavLink to="login">Login</NavLink>: ''}
    </nav>
  
  )
}

export default Nav
