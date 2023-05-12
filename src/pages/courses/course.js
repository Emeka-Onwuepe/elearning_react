import { Link, Navigate, useParams } from "react-router-dom"
import { useGetCourseQuery } from "../../features/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addCourse } from "../../features/course/courseSlice"
import { addAlert } from "../../features/alert/alertSlice"

const Course = () => {
    const{id} = useParams()
    const {user,course} = useSelector(state=>state)
    const dispatch = useDispatch()
    const token = user.usertoken

  let skip = course.course.id == id
 
  const [finaldata, setfinaldata] = useState(course)
  const {data,isError,error}  = useGetCourseQuery({id,token},{skip})

  // const finaldata = skip?course:data

 
 

  useEffect(() => {
    if(data){
      setfinaldata(data)
      dispatch(addCourse(data))
     }
 }, [data])

  useEffect(() => {
    
    if(isError){
     const errorData = {
       status_code: error.status,
       message: error.data.detail
     }
     for (let key in error.data){
      errorData.message = error.data[key]
     }
     dispatch(addAlert(errorData))
   }
 }, [isError])


 
    
   if(!user.logedin){
    return  <Navigate to={'/login'} />
   }
  return (
    <>
    {finaldata ? 
      <div>
      {finaldata.course.course_week.map((elem,index) => (
        <div key={elem.id}>
      <h3 key={elem.id}  >{elem.name}</h3>
        {elem.course_unit.map(unit=>{
          
            let [select_unit] = finaldata.units.filter(item=>item.id == unit)
            
            return finaldata.materials.map(unit=>{
                if(unit.id == select_unit.material.id){
                    if(unit.material_type === 'article')
                    {
                        return<Link to={`/lesson/${index+1}/${unit.material_type}/${unit[unit.material_type].id}`} key={unit.id}>
                            {unit[unit.material_type].title}</Link>
                    }else{
                        return<Link to={`/lesson/${index+1}/${unit.material_type}/${unit[unit.material_type].id}`} key={unit.id}>
                            {unit[unit.material_type].name}</Link>
                    }
                }
            }) 
            
        })}
      </div>

      )
      )}
      </div>
    :<h1>Loading</h1>}
   </>
  )
}

export default Course
