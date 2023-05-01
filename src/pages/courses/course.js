import { Link, Navigate, useParams } from "react-router-dom"
import { useGetCourseQuery } from "../../features/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addError } from "../../features/error/errorSlice"

const Course = () => {
    const{id} = useParams()
    const user = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const token = user.usertoken
   const {data,isError,error}  = useGetCourseQuery({id,token})

   useEffect(() => {
    
    if(isError){
     const errrorData = {
       status_code: error.status,
       message: error.data.detail
     }
     dispatch(addError(errrorData))
   }
 }, [isError])
    
   if(!user.logedin){
    return  <Navigate to={'/login'} />
   }
  return (
    <>
    {data ? 
      <div>
      {data.course.course_week.map(elem => (
        <div key={elem.id}>
      <h3 key={elem.id}  >{elem.name}</h3>
        {elem.course_unit.map(unit=>{
          
            let [select_unit] = data.units.filter(item=>item.id == unit)
            
            return data.materials.map(unit=>{
                if(unit.id == select_unit.material.id){
                    if(unit.material_type === 'article')
                    {
                        return<Link to={`/lesson/${unit.material_type}/${unit[unit.material_type].id}`} key={unit.id}>
                            {unit[unit.material_type].title}</Link>
                    }else{
                        return<Link to={`/lesson/${unit.material_type}/${unit[unit.material_type].id}`} key={unit.id}>
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
