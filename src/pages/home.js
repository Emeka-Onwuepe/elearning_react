import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Home() {

  const user = useSelector(state => state.user)

  if(user.logedin){
    return  <Navigate to={'/userpage'} />
   }

  return (
   <Fragment>
   <h1>Title Header</h1>
   </Fragment>

  );
}
