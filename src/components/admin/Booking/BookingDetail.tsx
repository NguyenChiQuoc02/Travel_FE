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
import { API_END_POINT } from "@/axios/api";

interface BookingDetailsModalProps {
  open: boolean;
  bookingDetails: any;
  handleClose: () => void;
}

const BookingDetailsModal: React.FC<BookingDetailsModalProps> = ({
  open,
  bookingDetails,
  handleClose,
}) => {
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
                  <strong>ID Đặt Tour:</strong> {bookingDetails.bookingId}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Người Dùng:</strong> {bookingDetails.user.name} -{" "}
                  {bookingDetails.user.email}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Tour:</strong> {bookingDetails.tour.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Ngày Đặt:</strong> {bookingDetails.bookingDate}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Số lượng:</strong> {bookingDetails.amount}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Trạng Thái Thanh Toán:</strong>{" "}
                  {bookingDetails.paymentStatus}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Ngày Thanh Toán:</strong> {bookingDetails.paymentDate}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <strong>Phương Thức Thanh Toán:</strong>{" "}
                  {bookingDetails.paymentMethod}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <img
                  src={`${API_END_POINT}/image/viewImage/${bookingDetails.tour.destination.imageUrl}`}
                  alt={bookingDetails.tour.name}
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
              <strong>Ngày Khởi Hành:</strong> {bookingDetails.tour.startDate}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              <strong>Ngày Kết Thúc:</strong> {bookingDetails.tour.endDate}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: "10px 20px" }}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingDetailsModal;
