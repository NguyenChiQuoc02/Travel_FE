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

export default function CreateTour() {
  const [destinationId, setDestinationId] = useState<number>(5);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [tourData, setTourData] = useState({
    name: "",
    price: "",
    startDate: "",
    endDate: "",
    descriptionTour: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTourData({
      ...tourData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string | number>) => {
    setDestinationId(Number(event.target.value)); // Ensure the value is a number
  };
  const handleBack = () => {
    router.push("/admin/tour");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await tourService.createTour(
        {
          ...tourData,
          price: parseFloat(tourData.price),
        },
        destinationId
      );

      if (response && response.status === "ok") {
        alert("Tạo tour thành công!");
        router.push("/admin/tour");
      } else {
        alert("Có lỗi xảy ra: " + response.message);
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      alert("Có lỗi xảy ra khi tạo tour.");
    }
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
              Tạo Tour
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
}
