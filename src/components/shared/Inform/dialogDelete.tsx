import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  onConfirm: () => void;
}

const ConfirmDelete: React.FC<Props> = ({ open, onConfirm }) => {
  return (
    <Dialog open={open} onClose={() => onConfirm()}>
      <DialogTitle>Xác nhận</DialogTitle>
      <DialogContent>Bạn có muốn xóa không?</DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm()} color="error">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
