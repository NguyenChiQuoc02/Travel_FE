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
import ToastMessage from "@/components/shared/Inform/toastMessage";

export const EditDestination: React.FC<{ id: number }> = ({ id }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
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
          setToastMessage("Có lỗi khi sửa thông tin tour");
          setToastOpen(true);
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

  const validateInputs = () => {
    if (!name.trim()) {
      setToastMessage("Vui lòng nhập tên");
      setToastOpen(true);
      return false;
    }
    if (!description.trim()) {
      setToastOpen(true);
      setToastMessage("Vui lòng nhập mô tả!");
      return false;
    }
    if (!location.trim()) {
      setToastOpen(true);
      setToastMessage("Vui lòng nhập vị trí!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    try {
      await destinationService.editDestination(
        id.toString(),
        name,
        description,
        location,
        file!
      );

      setToastMessage("Cập nhật điểm đến thành công!");
      setToastOpen(true);
      setTimeout(() => {
        router.push("/admin/destination");
      }, 2000);
    } catch (error) {
      console.error("Error updating destination:", error);
      setToastMessage("Có lỗi xảy ra khi cập nhật điểm đến!");
      setToastOpen(true);
    }
  };

  return (
    <>
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
            />
            <TextField
              label="Mô Tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              label="Vị Trí"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
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
      <ToastMessage
        message={toastMessage}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
};
