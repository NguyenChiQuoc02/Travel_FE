"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { destinationService } from "@/axios/service";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
} from "@mui/material";

export default function AdminDestination() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  interface Destination {
    destinationId: number;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
  }

  const itemsPerPage = 6;

  const fetchDestination = () => {
    destinationService
      .fetchDestination(page, itemsPerPage)
      .then((data) => {
        if (data && data.data.items) {
          setDestinations(data.data.items);
          setTotalPages(data.data.totalPages);
        } else {
          setDestinations([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        setDestinations([]);
      });
  };
  useEffect(() => {
    fetchDestination();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleAddDestination = () => {
    router.push("/admin/destination/add");
  };

  const handleEditDestination = (id: number) => {
    router.push(`/admin/destination/edit/${id}`);
  };

  const handleDeleteDestination = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tour này?")) {
      destinationService
        .deleteDestination(id)
        .then(() => {
          alert("Xóa địa điểm thành công!");
          fetchDestination();
        })
        .catch((error) => {
          console.error("Error deleting tour:", error);
          alert("Có lỗi xảy ra khi xóa tour.");
        });
    }
  };
  return (
    <>
      <Container sx={{ justifyContent: "center", marginTop: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Điểm đến hấp dẫn
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "flex-end", marginBottom: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddDestination}
          >
            Thêm Tour
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="destination table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Tên Điểm Đến</TableCell>
                <TableCell align="center">Mô Tả</TableCell>
                <TableCell align="center">Vị Trí</TableCell>
                <TableCell align="center">Hình Ảnh</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {destinations.map((destination, index) => (
                <TableRow key={destination.destinationId}>
                  <TableCell align="center">
                    {++index + itemsPerPage * page}
                  </TableCell>
                  <TableCell align="center">{destination.name}</TableCell>
                  <TableCell align="center">
                    {destination.description}
                  </TableCell>
                  <TableCell align="center">{destination.location}</TableCell>
                  <TableCell align="center">
                    <img
                      src={`http://localhost:8080/image/viewImage/${destination.imageUrl}`}
                      alt={destination.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          handleEditDestination(destination.destinationId)
                        }
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() =>
                          handleDeleteDestination(destination.destinationId)
                        }
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
          onChange={(event, value) => handlePageChange(event, value - 1)} // Điều chỉnh để truyền đúng giá trị cho state
          sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
        />
      </Container>
    </>
  );
}
