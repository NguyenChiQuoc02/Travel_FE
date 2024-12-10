import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Stack,
  Button,
  Pagination,
} from "@mui/material";
import { userService } from "@/axios/service/index";

interface Role {
  id: number;
  name: string;
}

interface User {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  roles: Role[];
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;

  // Fetch user data
  const fetchUsers = () => {
    userService
      .fetchUsers({ page: page, size: itemsPerPage })
      .then((data) => {
        if (data && data.data.items) {
          setUsers(data.data.items);
          setTotalPages(data.data.totalPages);
        } else {
          setUsers([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setUsers([]);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1); // Điều chỉnh để phù hợp với index từ 0
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Danh Sách Người Dùng
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Số Điện Thoại</TableCell>
              <TableCell align="center">Quyền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.userId}>
                <TableCell align="center">
                  {index + 1 + itemsPerPage * page}
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phoneNumber}</TableCell>
                <TableCell align="center">
                  {user.roles.map((role) => role.name).join(", ")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={handlePageChange}
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      />
    </Container>
  );
};

export default UserTable;
