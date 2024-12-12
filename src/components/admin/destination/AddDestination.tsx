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
import ToastMessage from "@/components/shared/Inform/toastMessage";

const CreateDestination = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setToastMessage("Vui lòng chọn ảnh");
      setToastOpen(true);
      return;
    }
    if (!name || !location || !description) {
      setToastMessage("Vui lòng không để trống các trường");
      setToastOpen(true);
      return;
    }

    try {
      await destinationService.createDestination(
        name,
        description,
        location,
        file
      );
      setToastMessage("Tạo điểm đến thành công");
      setToastOpen(true);
      router.push("/admin/destination");
    } catch (error) {
      console.error("Có lỗi khi tạo điểm đến:", error);
      setToastMessage("Có lỗi khi tạo điểm đến");
      setToastOpen(true);
    }
  };

  return (
    <>
      <ToastMessage
        message={toastMessage}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
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
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tên"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextareaAutosize
            minRows={4}
            placeholder="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 16,
              fontSize: "16px",
              borderRadius: 4,
              borderColor: "#ccc",
            }}
          />
          <TextField
            fullWidth
            label="Địa điểm"
            variant="outlined"
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
      </Box>
    </>
  );
};

export default CreateDestination;
