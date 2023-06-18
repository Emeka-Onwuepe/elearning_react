import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NetworkReport =() => {

  const [status, setStatus] = useState(navigator.onLine);

  const navigate = useNavigate()

  useEffect(() => {
    window.ononline = (e) => {
      setStatus(true);
      navigate(0)
    };
    window.onoffline = (e) => {
      setStatus(false);
    };

    // if(status){
      
    // }
  }, [status]);
  return (
    <>
    
      {status ? 
      ''
      : 
        <div className="offline">
        You are offline
      </div>
      }
    </>
  );
}
export default NetworkReport;