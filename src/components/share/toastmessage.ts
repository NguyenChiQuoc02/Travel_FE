

import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

interface AlertMessageProps {
  type: "success" | "error";
  message: string; 
}

const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  return (
    <Alert severity={type} style={{ margin: "16px 0" }}>
      <AlertTitle>{type === "success" ? "Thành công" : "Lỗi"}</AlertTitle>
      {message}
    </Alert>
  );
};

export default AlertMessage;
