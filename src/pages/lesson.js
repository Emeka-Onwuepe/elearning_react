import { useParams } from "react-router-dom"
import { useGetlessonQuery } from "../features/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addError } from "../features/error/errorSlice"

const Lesson = () => {

  const{type, id} = useParams()
  const user = useSelector(state=>state.user)
  const token  = user.usertoken
  const {data,isError,error} = useGetlessonQuery({type, id,token})
  const dispatch = useDispatch()


  useEffect(() => {
    
    if(isError){
     
     const errorData = {
       status_code: error.status,
       message: error.data.detail
     }
     dispatch(addError(errorData))
     console.log(errorData)
   }
 }, [isError])

  return (
    <div>
      <h1>Helo from type</h1>
    </div>
  )
}

export default Lesson
