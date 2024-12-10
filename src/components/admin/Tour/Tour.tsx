"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { tourService } from "@/axios/service";
import { useRouter } from "next/navigation";

interface Tour {
  tourId: number;
  name: string;
  price: number;
  startDate: string;
  endDate: string;
  descriptionTour: string;
  destination: {
    destinationId: number;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
  };
}

export default function AdminTour() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  const itemsPerPage = 6;

  useEffect(() => {
    fetchTours();
  }, [page]);

  const fetchTours = () => {
    tourService
      .fetchToursAdmin(page, itemsPerPage)
      .then((data) => {
        console.log("check>>>", data);
        if (data && data.data.items) {
          setTours(data.data.items);
          setTotalPages(data.data.totalPages);
        } else {
          setTours([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
        setTours([]);
      });
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleAddTour = () => {
    router.push("/admin/tour/add");
  };

  const handleEditTour = (id: number) => {
    router.push(`/admin/tour/edit/${id}`);
  };

  const handleDeleteTour = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tour này?")) {
      tourService
        .deleteTour(id)
        .then(() => {
          alert("Xóa tour thành công!");
          fetchTours();
        })
        .catch((error) => {
          console.error("Error deleting tour:", error);
          alert("Có lỗi xảy ra khi xóa tour.");
        });
    }
  };

  return (
    <Container sx={{ justifyContent: "center", marginTop: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Danh sách tour hấp dẫn
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "flex-end", marginBottom: 2 }}
      >
        <Button variant="contained" color="primary" onClick={handleAddTour}>
          Thêm Tour
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên Tour</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tours.map((tour) => (
              <TableRow key={tour.tourId}>
                <TableCell>{tour.tourId}</TableCell>
                <TableCell>{tour.name}</TableCell>
                <TableCell>{tour.price} VND</TableCell>
                <TableCell>
                  {tour.startDate} - {tour.endDate}
                </TableCell>
                <TableCell>{tour.descriptionTour}</TableCell>
                <TableCell>
                  <img
                    src={`http://localhost:8080/image/viewImage/${tour.destination.imageUrl}`}
                    alt={tour.name}
                    style={{ width: "100px", height: "auto" }}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditTour(tour.tourId)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteTour(tour.tourId)}
                    >
                      Xóa
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
        onChange={(event, value) => handlePageChange(event, value - 1)}
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      />
    </Container>
  );
}
