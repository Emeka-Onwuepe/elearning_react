import { useSelector } from "react-redux"
import { getuserToken } from "../features/user/userslice"
import { Link, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useGetCoursesQuery} from "../features/api/apiSlice"

const UserPage = () => {
  const user = useSelector(state=>state.user)
 
  const {data,isLoading} = useGetCoursesQuery(user.usertoken)
 

  const getCourse = ()=>{
    // const id = e.currentTarget.id
    // console.log(id)
    return  <Navigate to={''} />
  }

 if(!user.logedin){
  return  <Navigate to={'/login'} />
 }
  return (
    <>
    {data ? 
      <div>
      {data.course_sets.map(elem => (
        <div key={elem.id}>
      <h3 key={elem.id}  >{elem.name}</h3>
      
        {elem.course_set_unit.map(item=>(
          <div id={item.id} key={item.id} onClick={getCourse}>
          <p key={item.id + 'name'}>{item.name}</p>
          <p key={item.weeks}>{item.weeks}</p>
          <Link key={item.id + 'link'}  to={`/course/${item.id}`} >Open</Link>
          </div>
        ))}
      
      </div>

      )
      )}
      </div>
    :<h1>Loading</h1>}
   </>
  )
}

export default UserPage
