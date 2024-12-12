import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { API_END_POINT } from "@/axios/api";
import { BookingDetailsModalProps } from "@/axios/data.type/booking";

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  open,
  bookingDetails,
  handleClose,
}) => {
  const { watch } = useFormContext();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "#1976d2",
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Chi Tiết Đặt Tour
      </DialogTitle>
      <DialogContent>
        {bookingDetails && (
          <Box sx={{ padding: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" color="textSecondary">
                  <strong>ID Đặt Tour:</strong>{" "}
                  {watch("bookingDetails.bookingId")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Người Dùng:</strong>{" "}
                  {watch("bookingDetails.user.name")} -{" "}
                  {watch("bookingDetails.user.email")}
                </Typography>

                <Typography variant="body1" color="textSecondary">
                  <strong>Ngày Đặt:</strong>{" "}
                  {watch("bookingDetails.bookingDate")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Số lượng:</strong> {watch("bookingDetails.amount")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Giá:</strong> {watch("bookingDetails.tour.price")} VND
                </Typography>

                <Typography variant="body1" color="textSecondary">
                  <strong>Trạng Thái Thanh Toán:</strong>{" "}
                  {watch("bookingDetails.paymentStatus")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Ngày Thanh Toán:</strong>{" "}
                  {watch("bookingDetails.paymentDate")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Phương Thức Thanh Toán:</strong>{" "}
                  {watch("bookingDetails.paymentMethod")}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Tour:</strong> {watch("bookingDetails.tour.name")}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <img
                  src={`${API_END_POINT}/image/viewImage/${watch("bookingDetails.tour.destination.imageUrl")}`}
                  alt={watch("bookingDetails.tour.name")}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
              </Grid>
            </Grid>
            <Divider sx={{ margin: "20px 0" }} />
            <Typography variant="body1" color="textSecondary">
              <strong>Ngày Khởi Hành:</strong>{" "}
              {watch("bookingDetails.tour.startDate")}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Ngày Kết Thúc:</strong>{" "}
              {watch("bookingDetails.tour.endDate")}
            </Typography>
            <Typography variant="body1" color="textSecondary" fontSize={22}>
              <strong>Tổng:</strong>{" "}
              {watch("bookingDetails.tour.price") *
                watch("bookingDetails.amount")}{" "}
              VND
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDetailsModal;
