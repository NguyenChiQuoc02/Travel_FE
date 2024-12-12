import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { tourService } from "@/axios/service";
import { destinationService } from "@/axios/service";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useMutation } from "@tanstack/react-query";
import { ChangeTour } from "@/axios/data.type/tour";
import ToastMessage from "@/components/shared/Inform/toastMessage";

const initialTour: ChangeTour = {
  name: "",
  price: 0,
  startDate: "",
  endDate: "",
  descriptionTour: "",
};
const EditTour: React.FC<{ id: number }> = ({ id }) => {
  const [destinationId, setDestinationId] = useState<number>(0);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [tourData, setTourData] = useState(initialTour);
  const router = useRouter();
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const { mutate } = useMutation({
    mutationFn: (body: ChangeTour) => {
      return tourService.editTour(body, id, destinationId);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTourData({
      ...tourData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    setDestinationId(Number(event.target.value));
  };

  const handleBack = () => {
    router.push("/admin/tour");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate(tourData, {
      onSuccess: () => {
        setToastMessage("Cập nhật tour thành công!");
        setToastOpen(true);
        setTimeout(() => {
          router.push("/admin/tour");
        }, 1000);
      },
      onError: () => {
        setToastMessage("Có lỗi xảy ra khi cập nhật tour.");
        setToastOpen(true);
      },
    });
  };

  useEffect(() => {
    const getDestination = async () => {
      const response = await destinationService.fetchDestinations();
      setDestinations(response.data);
    };
    getDestination();
  }, []);

  useEffect(() => {
    const getTourById = async () => {
      const response = await tourService.fetchTourById(id);
      setTourData({
        name: response.data.name,
        price: response.data.price.toString(),
        startDate: response.data.startDate,
        endDate: response.data.endDate,
        descriptionTour: response.data.descriptionTour,
      });
      setDestinationId(response.data.destination.destinationId);
    };
    getTourById();
  }, [id]);

  return (
    <>
      <ToastMessage
        message={toastMessage}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
      <Button variant="contained" color="primary" onClick={handleBack}>
        Trở lại
      </Button>
      <Container sx={{ marginTop: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sửa Tour
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Tên Tour"
              name="name"
              value={tourData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Giá Tour (VND)"
              name="price"
              type="number"
              value={tourData.price}
              onChange={handleChange}
              required
            />
            <TextField
              label="Ngày Bắt Đầu"
              name="startDate"
              type="date"
              value={tourData.startDate}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Ngày Kết Thúc"
              name="endDate"
              type="date"
              value={tourData.endDate}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Mô Tả Tour"
              name="descriptionTour"
              value={tourData.descriptionTour}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Điểm đến</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={destinationId}
                  label="Điểm đến"
                  onChange={handleSelectChange}
                >
                  {destinations.map((destination) => (
                    <MenuItem
                      key={destination.destinationId}
                      value={destination.destinationId}
                    >
                      {destination.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Lưu
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default EditTour;
