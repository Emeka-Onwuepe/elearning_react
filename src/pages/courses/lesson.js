import React from 'react';
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useGetlessonQuery } from "../../features/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addError } from "../../features/error/errorSlice"
import VideoLesson from "./videoLesson"
import ArticleLesson from "./articleLesson"
import Quiz from "./quiz"
import { getLesson, getNextLesson } from "../../features/course/courseSlice"



const Lesson = () => {

  const{week,type, id} = useParams()
  const user = useSelector(state=>state.user)
  
  const lesson = useSelector(state=>getLesson(state,type,id))
  const nextLesson = useSelector(state=>getNextLesson(state,week,type,id))
  const [nextWeek,nextId, nextType] = nextLesson


const navigate = useNavigate()
 if(!user.logedin | lesson == null ){
  return  <Navigate to={'/login'} />
 }


  return (
    <div>
   
      {
        type ==='video' && lesson ?<VideoLesson data={lesson}/>
        : type=== 'article' && lesson ?<ArticleLesson data={lesson}/> 
        : type=== 'quiz' && lesson ? <Quiz data={lesson}/>
        : ''
      }
      <button onClick={()=>navigate(-1)}>Previous</button>
      {

        nextId?
        <Link to={`/lesson/${nextWeek}/${nextType}/${nextId}`} >
                          Next</Link>
        : ''
      }
      
    </div>
  )
}

export default Lesson
