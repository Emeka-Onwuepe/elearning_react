import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../features/user/userslice"
import { useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { clearAlert } from "../features/alert/alertSlice";

const Alert = () => {
    const dispatch = useDispatch()
    const alert = useSelector(state=>state.alert)
    

    useEffect(() => {
      if(alert.status_code > 0){
        if(alert.status_code === 401){
          dispatch(logoutUser())
        }
        if(alert.status_code === 200){
          toast.success(alert.message)
        }else{
          toast.error(alert.message)
        }
       
        
        dispatch(clearAlert())
      }
    }, [alert])
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

export default Alert
