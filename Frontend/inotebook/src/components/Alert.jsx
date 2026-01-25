import React from "react";

const Alert = ({alert}) => {
  return (
    <div>
      <div className={`alert alert-${alert.type}` }role="alert">
         {alert.msg}
      </div>
    </div>
  );
};

export default Alert;
