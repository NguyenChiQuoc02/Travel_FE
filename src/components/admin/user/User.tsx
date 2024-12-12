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
  Button,
  Pagination,
} from "@mui/material";
import { userService } from "@/axios/service/index";
import { User } from "@/axios/data.type/user";
import ToastMessage from "@/components/shared/Inform/toastMessage";
import ConfirmDelete from "@/components/shared/Inform/dialogDelete";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const itemsPerPage = 6;

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

  const handleOpenDeleteDialog = (userId: number) => {
    setSelectedUserId(userId);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedUserId !== null) {
      userService
        .deleteUser(selectedUserId)
        .then(() => {
          setToastMessage("Xóa thành công");
          setToastOpen(true);
          fetchUsers();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setToastMessage("Có lỗi xảy ra khi xóa người dùng");
          setToastOpen(true);
        });
    }
    setDialogOpen(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value - 1);
  };

  return (
    <>
      <ToastMessage
        message={toastMessage}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
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
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center"></TableCell>
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
                  <TableCell align="center">
                    {user.deleted ? "Đã xóa" : "Đang dùng"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      disabled={user.deleted}
                      onClick={() => handleOpenDeleteDialog(user.userId)}
                    >
                      Xóa
                    </Button>
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
      <ConfirmDelete open={dialogOpen} onConfirm={handleDelete} />
    </>
  );
};

export default UserTable;
