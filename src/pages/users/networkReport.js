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
    <div>
    
      {status ? 
          <div className="">
            Network is fullly connected
          </div>
    
      : 
        <div className="">
        your are offline
      </div>
      }
    </div>
  );
}
export default NetworkReport;