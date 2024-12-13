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
  onCancel: () => void;
}

const ConfirmDelete: React.FC<Props> = ({ open, onConfirm, onCancel }) => {
  return (
    <Dialog open={open} onClose={() => onConfirm()}>
      <DialogTitle>Xác nhận</DialogTitle>
      <DialogContent>Bạn có muốn xóa không?</DialogContent>
      <DialogActions>
        <Button onClick={() => onCancel()} color="error">
          Hủy
        </Button>
        <Button onClick={() => onConfirm()} color="success">
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
