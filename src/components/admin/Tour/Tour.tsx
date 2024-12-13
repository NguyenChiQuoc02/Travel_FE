import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToastMessage from "@/components/shared/Inform/toastMessage";
import { tourService } from "@/axios/service";
import { useRouter } from "next/navigation";
import TourTable from "./TourTable";
import { Tour } from "@/axios/data.type/tour";
import ConfirmDelete from "@/components/shared/Inform/dialogDelete";

export default function AdminTour() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState<number | null>(null);
  const router = useRouter();

  const itemsPerPage = 6;

  const fetchTours = () => {
    tourService
      .fetchToursAdmin(page, itemsPerPage)
      .then((data) => {
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

  useEffect(() => {
    fetchTours();
  }, [page]);

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
  const handleDelete = () => {
    if (selectedTourId !== null) {
      tourService
        .deleteTour(selectedTourId)
        .then(() => {
          setToastMessage("Xóa tour thành công!");
          setToastOpen(true);
          fetchTours();
        })
        .catch((error) => {
          console.error("Error deleting tour:", error);
          setToastMessage("Có lỗi xảy ra khi xóa tour.");
          setToastOpen(true);
        });
    }
    setDialogOpen(false);
  };
  const handleDeleteTour = (id: number) => {
    setSelectedTourId(id);
    setDialogOpen(true);
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

        <TourTable
          tours={tours}
          onEdit={handleEditTour}
          onDelete={handleDeleteTour}
        />

        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={(event, value) => handlePageChange(event, value - 1)}
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
