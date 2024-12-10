import React, { useEffect, useState } from "react";
import { bookingService } from "@/axios/service";
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
  Stack,
  Pagination,
} from "@mui/material";
import BookingDetailsModal from "./BookingDetail";

const BookingList: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const fetchBookings = async (currentPage: number) => {
    const data = await bookingService.fetchListBookingPage({
      page: currentPage,
      size: 10,
    });
    if (data && data.data && data.data.items) {
      setBookings(data.data.items);
      setTotalPages(data.data.totalPages);
    } else {
      setBookings([]);
    }
  };

  const fetchBookingDetails = async (bookingId: number) => {
    try {
      const data = await bookingService.fetchBookingById(bookingId);
      if (data && data.data) {
        setBookingDetails(data.data);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  useEffect(() => {
    fetchBookings(page);
  }, [page]);

  const handleViewBookingDetails = (bookingId: number) => {
    fetchBookingDetails(bookingId);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setBookingDetails(null);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Danh Sách Đặt Tour
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="booking table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tên Người Dùng</TableCell>
              <TableCell align="center">Tour</TableCell>
              <TableCell align="center">Ngày Đặt</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Trạng Thái Thanh Toán</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.bookingId}>
                <TableCell align="center">{booking.bookingId}</TableCell>
                <TableCell align="center">{booking.user.name}</TableCell>
                <TableCell align="center">{booking.tour.name}</TableCell>
                <TableCell align="center">{booking.bookingDate}</TableCell>
                <TableCell align="center">{booking.amount}</TableCell>
                <TableCell align="center">{booking.paymentStatus}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleViewBookingDetails(booking.bookingId)
                      }
                    >
                      Xem Chi Tiết
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(event, value) => handlePageChange(event, value)}
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      />

      <BookingDetailsModal
        open={open}
        bookingDetails={bookingDetails}
        handleClose={handleCloseModal}
      />
    </Container>
  );
};

export default BookingList;
