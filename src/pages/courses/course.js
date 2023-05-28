import { NavLink, Navigate, Outlet, useParams } from "react-router-dom"
import { useGetCourseQuery } from "../../features/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addCourse, setDefaultLesson } from "../../features/course/courseSlice"
import { addAlert } from "../../features/alert/alertSlice"


const Course = () => {
    const{id} = useParams()
    const {user,course} = useSelector(state=>state)
    const dispatch = useDispatch()
    const token = user.usertoken

  const skip = course.course.id == id
  const [finaldata, setfinaldata] = useState(null)
  const {data,isError,error}  = useGetCourseQuery({id,token},{skip})

  // const finaldata = skip?course:data

  useEffect(() => {
    if(skip){
      setfinaldata(course)
    }
  }, [])
  
 let checkDefault = window.location.pathname.match(/\/course\/\d$/)
//  checkDefault = checkDefault?checkDefault:0
 


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


 useEffect(() => {
  if(finaldata){

    let first_unit = finaldata.course.course_week[0].course_unit[0]
    let [{material}] = finaldata.units.filter(item=>item.id == first_unit)
    let [unit] = finaldata.materials.filter(item=>item.id == material.id)

    let params = {week:1,type:unit.material_type,lesson_id:unit[unit.material_type].id}
    dispatch(setDefaultLesson(params))
    console.log('hello')

  
        // let elem = document.getElementsByClassName("0-0")
        // elem.Sle.display = 'none'
        // console.log(elem)
     
      
    // return  <Navigate to={'/userpage'} />
    
    // return  <Navigate to={`/course/${id}/lesson2/1/${}/${}`} />
    
    // `/course/${id}/lesson/${nextWeek}/${nextType}/${nextId}`
   }
}, [finaldata])

    
   if(!user.logedin){
    return  <Navigate to={'/login'} />
   }


   

  return (
    <>
    {finaldata ? 
    <div className="course_page flex_container">

   
      <div className="flex_container course_sidenav">
      {finaldata.course.course_week.map((elem,index) => (
        <div className="course_units" key={elem.id}>
      <h3 key={elem.id}  >{elem.name} <span className="lesser">{`(week ${index+1})`}</span></h3>
        {elem.course_unit.map((unit,unit_index)=>{
          
            let [select_unit] = finaldata.units.filter(item=>item.id == unit)
            
            return finaldata.materials.map((unit,material_idx)=>{
                if(unit.id == select_unit.material.id){

                  return<NavLink className={ checkDefault && `${index}-${material_idx}` == '0-0'? 'active': ''}
                   to={`lesson/${index+1}/${unit.material_type}/${unit[unit.material_type].id}`} key={unit.id}>
                           {unit_index+1}. {unit.material_type === 'article'?
                                            unit[unit.material_type].title:
                                            unit[unit.material_type].name}</NavLink>
                }
            }) 
            
        })}
      </div>

      )
      )}
      </div>

        <Outlet/>

      </div>
    :<h1>Loading</h1>}
   </>
  )
}

export default Course
