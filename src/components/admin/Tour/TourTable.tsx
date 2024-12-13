import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { API_END_POINT } from "@/axios/api";
import { Tour } from "@/axios/data.type/tour";

interface Props {
  tours: Tour[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TourTable: React.FC<Props> = ({ tours, onEdit, onDelete }) => {
  return (
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
                  src={`${API_END_POINT}/image/viewImage/${tour.destination.imageUrl}`}
                  alt={tour.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onEdit(tour.tourId)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(tour.tourId)}
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
  );
};

export default TourTable;
