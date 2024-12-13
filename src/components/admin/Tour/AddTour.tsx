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
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup.string().required("Tên Tour không để trống"),
  price: yup
    .number()
    .typeError("Giá Tour phải là một số hợp lệ")
    .positive("Giá Tour phải lớn hơn 0")
    .required("Giá Tour là bắt buộc"),
  startDate: yup.date().required("Ngày bắt đầu là bắt buộc"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "Ngày kết thúc không thể sớm hơn ngày bắt đầu")
    .required("Ngày kết thúc là bắt buộc"),
  descriptionTour: yup.string(),
});

export default function CreateTour() {
  const [destinationId, setDestinationId] = useState<number>(1);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: 0,
      startDate: undefined,
      endDate: undefined,
      descriptionTour: "",
    },
  });

  const router = useRouter();

  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    setDestinationId(Number(event.target.value));
  };

  const handleBack = () => {
    router.push("/admin/tour");
  };

  const { mutate } = useMutation({
    mutationFn: (body: ChangeTour) => {
      return tourService.createTour(body, destinationId);
    },
  });

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };

    mutate(formattedData, {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Tên Tour"
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Giá Tour (VND)"
                  type="number"
                  {...field}
                  value={field.value || ""}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Ngày Bắt Đầu"
                  type="date"
                  {...field}
                  value={field.value || ""}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                />
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Ngày Kết Thúc"
                  type="date"
                  {...field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                />
              )}
            />
            <Controller
              name="descriptionTour"
              control={control}
              render={({ field }) => (
                <TextField label="Mô Tả Tour" {...field} multiline rows={4} />
              )}
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
