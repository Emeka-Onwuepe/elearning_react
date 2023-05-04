import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate } from "react-router-dom"
import { useGetCoursesQuery} from "../../features/api/apiSlice"
import { addError } from "../../features/error/errorSlice"
import { useEffect, useState } from "react"

const UserPage = () => {
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const {data,isLoading,isError,error} = useGetCoursesQuery(user.usertoken)

  const [noClass, setnoClass] = useState(false)


  useEffect(() => {
    
     if(isError){
      // const errrorData = {
      //   status_code: error.status,
      //   message: error.data.detail
      // }
      const errorData = {
        status_code: error.status,
        message: error.data.detail
      }
      for (let key in error.data){
       errorData.message = error.data[key]
      }
      if(error.status === 403){
        setnoClass(true)
      }
      dispatch(addError(errorData))
    }
  }, [isError])

//  if(!user.logedin){
//   return  <Navigate to={'/login'} />
//  }

//  if(isError){
//   const errrorData = {
//     status_code: error.status,
//     message: error.data.detail
//   }
//   dispatch(addError(errrorData))
// }


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
          <div id={item.id} key={item.id}>
          <p key={item.id + 'name'}>{item.name}</p>
          <p key={item.weeks}>{item.weeks}</p>
          <Link key={item.id + 'link'}  to={`/course/${item.id}`} >Open</Link>
          </div>
        ))}
      
      </div>

      )
      )}
      </div>
    :noClass?<div><p>No content</p></div>
    :<h1>Loading</h1>}
   </>
  )
}

export default UserPage
