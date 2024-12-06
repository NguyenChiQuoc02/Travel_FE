import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { bookingService } from "@/axios/service/index";

interface QuickBookingProps {
  open: boolean;
  onClose: () => void;
  price: number;
  tourId: number;
}

const QuickBooking: React.FC<QuickBookingProps> = ({
  open,
  onClose,
  price,
  tourId,
}) => {
  const [amount, setAmount] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      await bookingService.createBooking({
        tourId,
        status: "CONFIRMED",
        amount,
        paymentMethod: "CASH",
        paymentStatus: "SUCCESS",
      });
      alert("Đặt thành công!");
      onClose();
    } catch (error) {
      console.error("Booking failed", error);
      alert("Đặt thất bại, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Đặt nhanh</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          <strong>Giá tour:</strong> {price.toLocaleString()} VND
        </Typography>
        <TextField
          label="Số lượng"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Tổng: {(price * amount).toLocaleString()} VND
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Hủy
        </Button>
        <Button
          onClick={handleBooking}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Đang đặt..." : "Đặt đơn"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuickBooking;
