import { useSelector } from "react-redux"
import { getuserToken } from "../features/user/userslice"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"

const UserPage = () => {
  const user = useSelector(state=>state.user)
 

 if(!user.logedin){
  return  <Navigate to={'/login'} />
 }
  return (
    <div>
      <h1>userpage</h1>
    </div>
  )
}

export default UserPage
