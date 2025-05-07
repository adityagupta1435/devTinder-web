import React from "react";

const InformationToast = ({ type, message }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className={"alert alert-" + type + " font-bold"}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default InformationToast;
