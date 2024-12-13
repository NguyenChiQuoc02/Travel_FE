import React from "react";
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
import { API_END_POINT } from "@/axios/api";
import { Destination } from "@/axios/data.type/destination";

interface Props {
  destinations: Destination[];
  page: number;
  itemsPerPage: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const DestinationTable: React.FC<Props> = ({
  destinations,
  page,
  itemsPerPage,
  onEdit,
  onDelete,
}) => {
  return (
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
              <TableCell align="center">{destination.description}</TableCell>
              <TableCell align="center">{destination.location}</TableCell>
              <TableCell align="center">
                <img
                  src={`${API_END_POINT}/image/viewImage/${destination.imageUrl}`}
                  alt={destination.name}
                  style={{ width: "100px", height: "auto" }}
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => onEdit(destination.destinationId)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(destination.destinationId)}
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

export default DestinationTable;
