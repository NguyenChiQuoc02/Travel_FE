import React, { useState, useEffect } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

interface ToastMessageProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  open,
  onClose,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert severity={message.includes("thành công") ? "success" : "error"}>
        <AlertTitle>
          {message.includes("thành công") ? "Thành công" : "Lỗi"}
        </AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;
