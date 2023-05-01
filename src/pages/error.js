import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../features/user/userslice"

const Error = () => {
    const dispatch = useDispatch()
    const error = useSelector(state=>state.error)
    if(error.status_code > 0){
      console.log(error.message)
      if(error.status_code === 401){
        dispatch(logoutUser())
      }
    }
  return (
    <>
      

    </>
  )
}

export default Error
