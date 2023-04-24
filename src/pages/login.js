import {  Link, Navigate } from "react-router-dom"
import { useLoginMutation } from "../features/api/apiSlice"
import { createUser } from "../features/user/userslice"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

const Login = () => {
  let location = window.location.origin
  const dispatch = useDispatch()
  const initialState = {
    email: "", password: ""
}
const [formstate, setFormstate] = useState(initialState);
const { email, password } = formstate;

const onChange = (e) => {
  setFormstate({ ...formstate, [e.target.name]: e.target.value })
}

const [userlogged, setuserlogged] = useState(false)
const [login,{isLoading}] = useLoginMutation()
const user = useSelector(state=>state.user)


if (userlogged| user.logedin) {
  return <Navigate to={'/userpage'} />
}


const  onSubmit = async (e)=>{
  e.preventDefault()
  const data = {data:{
      email: formstate.email,
      password: formstate.password
  }}
  let res = await login(data)
  if (res.data){
    dispatch(createUser({...res.data.user,'usertoken': res.data.token,logedin: true,})) 
    setuserlogged(true)
  }else{
    console.log(res.error)
  }

}

  return (
 <fieldset>
 <form action="" method="post" onSubmit={onSubmit}>
     <label htmlFor="email">EMAIL</label>
     <input type="email" name="email" value={email} id="email" onChange={onChange} placeholder="Please Enter Your Email" />
     <label htmlFor="password">PASSWORD</label>
     <input type="password" name="password" value={password} id="password" onChange={onChange} placeholder="Please Enter Your Password" />
     <button className='submitButton' type="submit">LOGIN</button>
 </form>
 <p className="log"><Link to="/register">REGISTER</Link> </p>
 <p className='restPassword'><a target="blank" href={`${location}/password_reset`}>FORGOT PASSWORD</a></p>
</fieldset>
  )
}

export default Login

