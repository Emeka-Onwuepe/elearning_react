import { Navigate, useParams } from "react-router-dom"
import { useGetCourseQuery } from "../features/api/apiSlice"
import { useSelector } from "react-redux"

const Course = () => {
    const{id} = useParams()
    const user = useSelector(state=>state.user)
    const token = user.usertoken
    console.log(id)
   const {data}  = useGetCourseQuery({id,token})
   console.log(data)

   if(!user.logedin){
    return  <Navigate to={'/login'} />
   }
  return (
    <div>
      Hello
    </div>
  )
}

export default Course
