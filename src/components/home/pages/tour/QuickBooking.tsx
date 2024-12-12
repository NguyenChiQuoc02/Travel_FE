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
import { useMutation } from "react-query";
import { bookingService } from "@/axios/service/index";
import ToastMessage from "@/components/shared/Inform/toastMessage";

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
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      await bookingService.createBooking({
        tourId,
        status: "CONFIRMED",
        amount,
        paymentMethod: "CASH",
        paymentStatus: "SUCCESS",
      });
    },
    onSuccess: () => {
      setToastMessage("Đặt tourtour thành công");
      setToastOpen(true);
      onClose();
    },
    onError: (error) => {
      console.error("Booking failed", error);
      setToastMessage("Có lỗi xảy ra khi đặt tour");
      setToastOpen(true);
    },
  });

  const handleBooking = () => {
    mutate();
  };

  return (
    <>
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
          <Button onClick={onClose} color="secondary" disabled={isLoading}>
            Hủy
          </Button>
          <Button
            onClick={handleBooking}
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? "Đang đặt..." : "Đặt đơn"}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastMessage
        message={toastMessage}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
};

export default QuickBooking;
