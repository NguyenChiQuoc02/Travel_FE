import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Stack,
  Card,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { destinationService } from "@/axios/service/index";
import { API_END_POINT } from "@/axios/api";

export const EditDestination: React.FC<{ id: number }> = ({ id }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      destinationService
        .fetchDestinationById(id)
        .then((response) => {
          const { name, description, imageUrl, location } = response.data;
          setName(name);
          setDescription(description);
          setLocation(location);
          setPreview(`${API_END_POINT}/image/viewImage/${imageUrl}`);
        })
        .catch((error) => {
          console.error("Error fetching destination:", error);
          alert("Có lỗi xảy ra khi tải dữ liệu điểm đến!");
        });
    }
  }, [id]);

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
    try {
      if (!name || !description || !location) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      await destinationService.editDestination(
        id.toString(),
        name,
        description,
        location,
        file!
      );

      alert("Cập nhật điểm đến thành công!");
      router.push("/admin/destination");
    } catch (error) {
      console.error("Error updating destination:", error);
      alert("Có lỗi xảy ra khi cập nhật điểm đến!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sửa Điểm Đến
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Tên Điểm Đến"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Mô Tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
          />
          <TextField
            label="Vị Trí"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            required
          />
          <Button variant="contained" component="label">
            Chọn Hình Ảnh Mới
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cập Nhật
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
