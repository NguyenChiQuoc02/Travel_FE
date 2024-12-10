import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  TextareaAutosize,
  Card,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { destinationService } from "@/axios/service";
import { useForm, Controller } from "react-hook-form";

const CreateDestination = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const onSubmit = async (data: any) => {
    if (!file) {
      setMessage("Vui lòng chọn file ảnh!");
      return;
    }

    try {
      await destinationService.createDestination(
        data.name,
        data.description,
        data.location,
        file
      );
      alert("Tạo điểm đến thành công!");
      router.push("/admin/destination");
    } catch (error) {
      console.error("Có lỗi khi tạo điểm đến:", error);
      setMessage("Có lỗi xảy ra khi tạo điểm đến!");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Tạo điểm đến
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Tên là bắt buộc" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Tên"
              variant="outlined"
              margin="normal"
              error={!!errors.name}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: "Mô tả là bắt buộc" }}
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              minRows={4}
              placeholder="Mô tả"
              style={{
                width: "100%",
                padding: 8,
                marginTop: 16,
                fontSize: "16px",
                borderRadius: 4,
                borderColor: "#ccc",
              }}
            />
          )}
        />
        <Controller
          name="location"
          control={control}
          defaultValue=""
          rules={{ required: "Địa điểm là bắt buộc" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Địa điểm"
              variant="outlined"
              margin="normal"
              error={!!errors.location}
            />
          )}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2, mb: 2 }}
          fullWidth
        >
          Tải ảnh
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {preview && (
          <Card sx={{ maxWidth: "100%", mt: 2 }}>
            <CardMedia
              component="img"
              height="300"
              image={preview}
              alt="Preview"
            />
          </Card>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Tạo
        </Button>
      </form>
      {message && (
        <Typography color="error" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default CreateDestination;
