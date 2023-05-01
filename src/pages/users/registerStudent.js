import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useRegisterUserMutation, useGetSchoolQuery } from '../../features/api/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../features/user/userslice'

const RegisterStudent = () => {
    const{schoolId} = useParams()
    const {data,isLoading,isError,error} =  useGetSchoolQuery(schoolId)
    const user = useSelector(state=>state.user)
    const [registerUser,{isLoading:isLoading2}] = useRegisterUserMutation()
    const dispatch = useDispatch()
    const [userlogged, setuserlogged] = useState(false)

    const initialState = {
        first_name: "", last_name: "", email: "",
        phone_number: "", password: "", confirm_password: "",
        user_type: 'student',student_class: ''
    }
    const initialErrorState = {
        first_name: false, last_name: false, phone_number: false, email: false, phoneNumLength: false
    }

    const [formstate, setFormstate] = useState(initialState);
    const [errorstate, setErrorstate] = useState(initialErrorState);
    const { first_name, last_name, phone_number, email, password, confirm_password,student_class } = formstate;
    let errorTest = {
        "name": /[^a-z\s]/i,
        "phone_number": /[^0-9+\s]/i,
        "email": /^[a-z]+\d*[a-z]*@[a-z]+\.\w+\s*$/gi,
    }

    const onChange = (e) => {
        setFormstate({ ...formstate, [e.target.name]: e.target.value })
    }
    const school = data? data.school : {id:'',customize:''}
    const onSubmit = async e => {
        e.preventDefault();
        const { first_name, last_name, phone_number, email,
             password, confirm_password, user_type,student_class} = formstate;
        const data = { first_name, last_name,email, 
                        user_type, phone_number, password,
                         student_class,'school_id': school.id,
                         'customize':school.customize }
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
    <>
    {data && !isLoading?
    <div>
        <h1>{school.name}</h1>
        <fieldset>
            <form action="" method="post" onSubmit={onSubmit}>
                <label htmlFor="first_name">FIRST NAME</label>
                {errorstate.first_name ? <p className="error">Only alphabets are allowed</p> : ""}
                <input type="text" name="first_name" value={first_name} id="first_name" onChange={onChange} placeholder="Enter first name" required />
                <label htmlFor="last_name">LAST NAME</label>
                {errorstate.last_name ? <p className="error">Only alphabets are allowed</p> : ""}
                <input type="text" name="last_name" value={last_name} id="last_name" onChange={onChange} placeholder="Enter last name" required />
                <label htmlFor="student_class">Class</label>
                <select id='student_class' name='student_class' onChange={onChange} value={student_class} required>
                    <option value="">Please, Select your Class</option>
                  
                    {data.classes.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
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
        </div>
        : isLoading?
        <h1>Loading</h1>
        :''}
        </>
  )
}

export default RegisterStudent
