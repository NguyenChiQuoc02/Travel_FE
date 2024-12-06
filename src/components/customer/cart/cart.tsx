import React, { useState, useEffect } from "react";
import axios from "axios";
import { bookingService } from "@/axios/service/index";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingService.fetchListBooking();
        setBookings(response.data || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  if (bookings.length === 0) {
    return (
      <Container>
        <Typography variant="h6" sx={{ mt: 4 }}>
          Không có đơn nào
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Danh sách đơn
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>#</strong>
              </TableCell>
              <TableCell>
                <strong>Tên tour</strong>
              </TableCell>
              <TableCell>
                <strong>Địa điểm</strong>
              </TableCell>
              <TableCell>
                <strong>Giá (VND)</strong>
              </TableCell>
              <TableCell>
                <strong>Trạng thái</strong>
              </TableCell>
              <TableCell>
                <strong>Thanh toán</strong>
              </TableCell>
              <TableCell>
                <strong>Ngày đặt</strong>
              </TableCell>
              <TableCell>
                <strong></strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow key={booking.bookingId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{booking.tour.name}</TableCell>
                <TableCell>{booking.tour.destination.name}</TableCell>
                <TableCell>{booking.tour.price.toLocaleString()}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>{booking.paymentStatus}</TableCell>
                <TableCell>
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    href={`/home/tour/${booking.tour.tourId}`}
                  >
                    Xem Tour
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BookingList;
