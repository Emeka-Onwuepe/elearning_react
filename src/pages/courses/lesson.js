import React from 'react';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useGetlessonQuery } from "../../features/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import VideoLesson from "./videoLesson"
import ArticleLesson from "./articleLesson"
import Quiz from "./quiz"
import { getLesson, getNextLesson } from "../../features/course/courseSlice"
import '../../css/lesson.css'


const Lesson = () => {

  let {id,week,type, lesson_id} = useParams()
  const user = useSelector(state=>state.user)
  const {defaultLesson} = useSelector(state=>state.course)
  
  if(!lesson_id){
   week = defaultLesson.week
   type = defaultLesson.type
   lesson_id = defaultLesson.lesson_id
  }
  
 

  // state.defaultLesson = action.payload
		

	// 	{id:1,type:unit.material_type,lesson_id:unit[unit.material_type].id}
  
  const lesson = useSelector(state=>getLesson(state,type,lesson_id))
  const nextLesson = useSelector(state=>getNextLesson(state,week,type,lesson_id))
  const [nextWeek,nextId, nextType] = nextLesson


const navigate = useNavigate()
 if(!user.logedin | lesson == null ){
  return  <Navigate to={'/login'} />
 }


  return (
    <div id='lesson'>
   
      {
        type ==='video' && lesson ?<VideoLesson data={lesson}/>
        : type=== 'article' && lesson ?<ArticleLesson data={lesson} token={user.usertoken}/> 
        : type=== 'quiz' && lesson ? <Quiz course_id={id} data={lesson}/>
        : ''
      }
      
      <div className='controls'>
      <button onClick={()=>navigate(-1)}>Back</button>
      {

        nextId?
        <Link to={`/course/${id}/lesson/${nextWeek}/${nextType}/${nextId}`} >
                         <button>Next</button></Link>
        : ''
      }
      </div>
     
      
    </div>
  )
}

export default Lesson
