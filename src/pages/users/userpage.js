import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useGetCoursesQuery, useSetUserMutation} from "../../features/api/apiSlice"
import { addAlert} from "../../features/alert/alertSlice"
import { useEffect, useState } from "react"
import { setPublicKeyAndCourses } from "../../features/course/courseSlice"
import { createUser } from "../../features/user/userslice"
import DisplayProducts from "../courses/displayProducts"

const UserPage = () => {
  const user = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {data,isLoading,isError,error} = useGetCoursesQuery(user.usertoken)

  const [noClass, setnoClass] = useState(false)
  const [setUser] =useSetUserMutation()


  useEffect(() => {
    
     if(isError){
      // const errrorData = {
      //   status_code: error.status,
      //   message: error.data.detail
      // }
      const errorData = {
        status_code: error.status,
        message: ''
      }

      for (let key in error.data){
       errorData.message = error.data[key]
      }
      if(error.status === 403){
        setnoClass(true)
      }
      dispatch(addAlert(errorData))
    }
  }, [isError])

  useEffect(() => {
    if(data){
      if(data.public_key){

        dispatch(setPublicKeyAndCourses({
                                        key:data.public_key,
                                        available_courses:data.available_courses}))
      }
      
    }
  }, [data])

  const  setuser = async (e)=>{
    e.preventDefault()
   
    let res = await setUser(user.usertoken)
    if (res.data){
      dispatch(createUser({...res.data.user,'usertoken': res.data.token,logedin: true,})) 
      navigate(0)
    }else{
     
      const errorData = {
        status_code: res.error.status,
        message: ''
      }
      for (const key in res.error.data) {
        errorData.message = res.error.data[key]
        dispatch(addAlert(errorData))
      }
    }
  
  }


if(!user.logedin){
  return  <Navigate to={'/login'} />
 }


  return (
    <>
    {data ? 
      <div>
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
      <div>
        fjfjj
      </div>
      <DisplayProducts products={data.available_courses} />
      </div>
    :noClass?<div><p>No content <button onClick={setuser}>Upgrade Account For Free</button> </p></div>
    :<h1>Loading</h1>}
   </>
  )
}

export default UserPage
