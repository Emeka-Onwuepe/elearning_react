import { Form, NavLink } from "react-router-dom"
import { useLoginMutation } from "../features/api/apiSlice"

const Login = () => {
  let location = window.location.origin
  const data = {
    data:{
          email : "pascalemy2010@gmail.com",
          password : "casdonmystery"
        }
}


const [login] = useLoginMutation()
// const getdata = (e)=>{
//   e.preventDefault()
//   login(data)
// }
  return (
    <fieldset>
    <Form action="" method="post" >
        <label htmlFor="email">EMAIL</label>
        <input type="email" name="email" id="email"  placeholder="Please Enter Your Email" />
        <label htmlFor="password">PASSWORD</label>
        <input type="password" name="password"  id="password"  placeholder="Please Enter Your Password" />
        <button className='submitButton' type="submit">LOGIN</button>
    </Form>
    <p className="log"><NavLink to="/register">REGISTER</NavLink> </p>
    <p className='restPassword'><a target="blank" href={`${location}/password_reset`}>FORGOT PASSWORD</a></p>
</fieldset>
  )
}

export default Login

