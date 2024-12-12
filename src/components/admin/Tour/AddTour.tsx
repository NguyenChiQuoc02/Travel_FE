"use client";

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
import { Destination } from "@/axios/data.type/destination";
import ToastMessage from "@/components/shared/Inform/toastMessage";

export default function CreateTour() {
  const [destinationId, setDestinationId] = useState<number>(1);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [tourData, setTourData] = useState({
    name: "",
    price: 0,
    startDate: "",
    endDate: "",
    descriptionTour: "",
  });
  const router = useRouter();

  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    setDestinationId(Number(event.target.value));
  };

  const handleBack = () => {
    router.push("/admin/tour");
  };

  const { mutate, error, data, reset } = useMutation({
    mutationFn: (body: ChangeTour) => {
      return tourService.createTour(body, destinationId);
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTourData({
      ...tourData,
      [e.target.name]: e.target.value,
    });
    if (data || error) {
      reset();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tourData.name.trim()) {
      setToastMessage("Tên Tour không để trống");
      setToastOpen(true);
      return;
    }
    if (tourData.price <= 0) {
      setToastMessage("Giá Tour phải lớn hơn 0.");
      setToastOpen(true);
      return;
    }
    if (!tourData.startDate || !tourData.endDate) {
      setToastMessage("Ngày bắt đầu và ngày kết thúc là bắt buộc.");
      setToastOpen(true);
      return;
    }
    if (new Date(tourData.startDate) > new Date(tourData.endDate)) {
      setToastMessage("Ngày kết thúc không thể sớm hơn ngày bắt đầu.");
      setToastOpen(true);
      return;
    }

    mutate(tourData, {
      onSuccess: () => {
        setToastMessage("Thêm tour thành công!");
        setToastOpen(true);
        setTimeout(() => {
          router.push("/admin/tour");
        }, 1000);
      },
      onError: () => {
        setToastMessage("Có lỗi xảy ra khi thêm tour.");
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
          Tạo Tour Mới
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Tên Tour"
              name="name"
              value={tourData.name}
              onChange={handleChange}
            />
            <TextField
              label="Giá Tour (VND)"
              name="price"
              type="number"
              value={tourData.price}
              onChange={handleChange}
            />
            <TextField
              label="Ngày Bắt Đầu"
              name="startDate"
              type="date"
              value={tourData.startDate}
              onChange={handleChange}
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
              Tạo Tour
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}
