import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import { reviewService } from "@/axios/service/index";

interface Props {
  open: boolean;
  onClose: () => void;
  destinationId: number;
}

const AddReview: React.FC<Props> = ({ open, onClose, destinationId }) => {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    if (rating && comment.trim()) {
      const review = {
        destination: { destinationId },
        rating,
        comment,
        reviewDate: new Date().toISOString(),
      };

      const response = await reviewService.createReview(review);
      console.log("check data>>> ", response);
      if (response) {
        alert("Đánh giá thành công");
        onClose();
      } else {
        alert("Có lỗi xảy ra khi thêm đánh giá");
      }
    } else {
      alert("Vui lòng điền đủ thông tin đánh giá");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm đánh giá</DialogTitle>
      <DialogContent>
        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          precision={1}
        />
        <TextField
          fullWidth
          label="Bình luận"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReview;
