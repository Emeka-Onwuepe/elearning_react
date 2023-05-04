import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../features/user/userslice"
import { useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { clearError } from "../features/error/errorSlice";

const Error = () => {
    const dispatch = useDispatch()
    const error = useSelector(state=>state.error)
    

    useEffect(() => {
      if(error.status_code > 0){
        if(error.status_code === 401){
          dispatch(logoutUser())
        }
      }
      toast.error(error.message)
      dispatch(clearError())
    }, [error])
  return (
    <>
            
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
/>
    </>
  )
}

export default Error
