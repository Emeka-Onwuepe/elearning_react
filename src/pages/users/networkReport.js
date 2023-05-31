import React, { useState, useEffect } from "react";

const NetworkReport =() => {
  const [status, setStatus] = useState(navigator.onLine);
  useEffect(() => {
    window.ononline = (e) => {
      setStatus(true);
    };
    window.onoffline = (e) => {
      setStatus(false);
    };
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