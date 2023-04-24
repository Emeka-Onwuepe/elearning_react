import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../features/api/apiSlice';
import { createUser } from '../features/user/userslice';

const RegisterUser = () => {

const user = useSelector(state=>state.user)
const [registerUser,{isLoading}] = useRegisterUserMutation()
const dispatch = useDispatch()
const [userlogged, setuserlogged] = useState(false)

const initialState = {
    first_name: "", last_name: "", email: "",
     phone_number: "", password: "", confirm_password: "",
     user_type: 'individual'
}
const initialErrorState = {
    first_name: false, last_name: false, phone_number: false, email: false, phoneNumLength: false
}

const [formstate, setFormstate] = useState(initialState);
const [errorstate, setErrorstate] = useState(initialErrorState);
const { first_name, last_name, phone_number, email, password, confirm_password } = formstate;
let errorTest = {
    "name": /[^a-z\s]/i,
    "phone_number": /[^0-9+\s]/i,
    "email": /^[a-z]+\d*[a-z]*@[a-z]+\.\w+\s*$/gi,
}

const onChange = (e) => {
    setFormstate({ ...formstate, [e.target.name]: e.target.value })
}

const onSubmit = async e => {
    e.preventDefault();
    const { first_name, last_name, phone_number, email, password, confirm_password, user_type} = formstate;
    const data = { first_name, last_name,email, user_type, phone_number, password }
    
    const phone = errorTest.phone_number.test(phone_number)
    const firstName = errorTest.name.test(first_name)
    const lastName = errorTest.name.test(last_name)
    const Email = !errorTest.email.test(email)
    const phoneNumLength = false

    setErrorstate(initialErrorState)
    if (password == confirm_password && !firstName && !lastName && !phone && !Email && !phoneNumLength) {
       const res = await registerUser(data)
        if (res.data){
            dispatch(createUser({...res.data.user,'usertoken': res.data.token,logedin: true,})) 
            setuserlogged(true)
          }else{
            console.log(res.error)
          }
    } else if (password != confirm_password) {
        console.log({ "passwordError": "passwords did not match" })
    }
    setErrorstate({ first_name: firstName, last_name: lastName, phone_number: phone, email: Email, phoneNumLength })
}

if (user.logedin|userlogged) {
    return <Navigate to={'/userpage'} />
  }
  return (
    <fieldset>
            <form action="" method="post" onSubmit={onSubmit}>
                <label htmlFor="first_name">FIRST NAME</label>
                {errorstate.first_name ? <p className="error">Only alphabets are allowed</p> : ""}
                <input type="text" name="first_name" value={first_name} id="first_name" onChange={onChange} placeholder="Enter first name" required />
                <label htmlFor="last_name">LAST NAME</label>
                {errorstate.last_name ? <p className="error">Only alphabets are allowed</p> : ""}
                <input type="text" name="last_name" value={last_name} id="last_name" onChange={onChange} placeholder="Enter last name" required />
                <label htmlFor="phone_number">PHONE NUMBER</label>
                {errorstate.phone_number ? <p className="error">Only digits/numbers are allowed </p> : errorstate.phoneNumLength ? <p className="error">Phone Number should not be less than 11 digits </p> : ""}
                <input type="text" name="phone_number" value={phone_number} id="phone_number" onChange={onChange} placeholder="Enter phone number (optional)" />
                <label htmlFor="email">EMAIL</label>
                {errorstate.email ? <p className="error">Invalid Email</p> : ""}
                <input type="email" name="email" value={email} id="email" onChange={onChange} placeholder="Enter email" required />
                <label htmlFor="password">PASSWORD</label>
                <input type="password" name="password" value={password} id="password" onChange={onChange} placeholder="Enter password" required />
                <label htmlFor="confirm_password">CONFIRM PASSWORD</label>
                <input type="password" name="confirm_password" value={confirm_password} id="password" onChange={onChange} placeholder="Confirm password" required />
                <button className='submitButton' type="submit">REGISTER</button>
                {/* <p className="log"><NavLink to="/login">LOGIN</NavLink> </p> */}
            </form>
        </fieldset>
  )
}

export default RegisterUser

