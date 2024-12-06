import React, { useState } from "react";
import axios from "axios";
import { API_END_POINT } from "@/axios/api";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  TextareaAutosize,
  Card,
  CardMedia,
} from "@mui/material";

const CreateDestination = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const token = localStorage.getItem("accessToken") || "";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage("Vui lòng chọn file ảnh!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);

    try {
      const response = await axios.post(
        `${API_END_POINT}/admin/destination`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Tạo điểm đến thành công!");
      router.push("/admin/destination");
    } catch (error) {
      console.error("Error creating destination:", error);
      alert("Có lỗi xảy ra khi tạo điểm đến!");
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
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Tên"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextareaAutosize
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Địa điểm"
          variant="outlined"
          margin="normal"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
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
