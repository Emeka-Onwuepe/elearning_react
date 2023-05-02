import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../features/user/userslice"
import { useEffect } from "react"

const Error = () => {
    const dispatch = useDispatch()
    const error = useSelector(state=>state.error)
    
    
    useEffect(() => {
      if(error.status_code > 0){
        console.log(error.message)
        if(error.status_code === 401){
          dispatch(logoutUser())
        }
      }
    }, [error])
  return (
    <>
      

    </>
  )
}

export default Error
