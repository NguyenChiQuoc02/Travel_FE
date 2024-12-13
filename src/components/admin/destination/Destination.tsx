import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { destinationService } from "@/axios/service";
import { useRouter } from "next/navigation";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToastMessage from "@/components/shared/Inform/toastMessage";
import DestinationTable from "./DestinationTable";
import ConfirmDelete from "@/components/shared/Inform/dialogDelete";

export default function AdminDestination() {
  const [destinations, setDestinations] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [destiationId, setDestiationId] = useState<number | null>(null);

  const router = useRouter();

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
      .catch(() => {
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
    setPage(value - 1);
  };

  const handleAddDestination = () => {
    router.push("/admin/destination/add");
  };

  const handleEditDestination = (id: number) => {
    router.push(`/admin/destination/edit/${id}`);
  };

  const handleDeleteDestination = (id: number) => {
    setDestiationId(id);
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (destiationId !== null) {
      destinationService
        .deleteDestination(destiationId)
        .then(() => {
          setToastMessage("Xóa địa điểm thành công!");
          setToastOpen(true);
          fetchDestination();
        })
        .catch(() => {
          setToastMessage("Có lỗi xảy ra khi xóa tour.");
          setToastOpen(true);
        });
    }
    setDialogOpen(false);
  };

  return (
    <>
      <ToastMessage
        message={toastMessage}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
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
            Thêm địa điểm
          </Button>
        </Stack>
        <DestinationTable
          destinations={destinations}
          page={page}
          itemsPerPage={itemsPerPage}
          onEdit={(id) => handleEditDestination(id)}
          onDelete={(id) => handleDeleteDestination(id)}
        />
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={handlePageChange}
          sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
        />
      </Container>
      <ConfirmDelete
        open={dialogOpen}
        onConfirm={handleDelete}
        onCancel={() => setDialogOpen(false)}
      />
    </>
  );
}
