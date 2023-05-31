import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { logoutUser } from '../features/user/userslice'
import { useLogoutMutation } from '../features/api/apiSlice'
import { resetCourse } from '../features/course/courseSlice'
import { addAlert } from '../features/alert/alertSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPenNib, faShoppingBasket, faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const Header = () => {

const user = useSelector(state=>state.user)
const cart = useSelector(state=>state.cart.products)
const path = useLocation().pathname
const dispatch = useDispatch()
const[logout,{isSuccess,isError,error}] = useLogoutMutation()

useEffect(() => {
  if(isError){
    const errorData = {
      status_code: error.status,
      message: error.data.detail
    }
    dispatch(addAlert(errorData))
  }
}, [isError])

const onClick = async (e)=>{
  e.preventDefault()
  const data = await logout(user.usertoken)
 
  if(data){
    dispatch(logoutUser()) 
    dispatch(resetCourse())
  }
 
  
}

  return (
    <header>



      <NavLink to={user.logedin?'userpage':'/'}>

      <div className="logo_div"><img src={require("../css/logo.png")} alt="logo" /></div>
      </NavLink>

      
      <nav className="navs">
      <NavLink to="contact">Contact</NavLink>
        {user.logedin?
        <>
      
       <div id="cart" className="cart">
               <NavLink to='cart'>
                  <svg stroke="currentColor" fill="#203B8C" strokeWidth="0" viewBox="0 0 576 512" style={{fontSize:'50px'}} className="cart-shop" xmlns="http://www.w3.org/2000/svg"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>
                  <span id="cart_count" className="cart_count">{cart.length}</span>
                </NavLink>
        </div>
        <NavLink onClick={onClick} >Logout</NavLink></>: path !='/login'?
        <NavLink to="login">Login</NavLink>: ''}
        
    </nav>
    </header>
  )
}

export default Header
