"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { tourService } from "@/axios/service";
import { useRouter } from "next/navigation";

interface Tour {
  tourId: number;
  name: string;
  price: number;
  startDate: string;
  endDate: string;
  descriptionTour: string;
  destination: {
    destinationId: number;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
  };
}

export default function Tour() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const itemsPerPage = 6;

  const priceOptions = [
    { label: "Dưới 1 triệu", value: 1000000 },
    { label: "1 - 3 triệu", value: 3000000 },
    { label: "3 - 5 triệu", value: 5000000 },
    { label: "Trên 5 triệu", value: undefined },
  ];

  const fetchTours = () => {
    tourService
      .searchTour(page, itemsPerPage, name, minPrice, maxPrice)
      .then((data) => {
        if (data && data.items) {
          setTours(data.items);
          setTotalPages(data.totalPages);
        } else {
          setTours([]);
          setTotalPages(0);
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

  const handleSearch = () => {
    setPage(1);
    fetchTours();
  };

  const handleNavigate = (id: number) => {
    router.push(`/home/tour/${id}`);
  };

  return (
    <Container sx={{ justifyContent: "center", marginTop: 5 }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Danh sách tour hấp dẫn
      </h1>

      {/* Search Form */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          marginBottom: 3,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Tìm kiếm"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ minWidth: 200 }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Mức giá thấp</InputLabel>
          <Select value={minPrice}>
            {priceOptions.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Mức giá cao</InputLabel>
          <Select value={maxPrice}>
            {priceOptions.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </Box>

      {/* Tour List */}
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {tours.map((tour) => (
          <Grid item xs={12} sm={4} md={4} key={tour.tourId}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => handleNavigate(tour.tourId)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:8080/image/viewImage/${tour.destination.imageUrl}`}
                  alt={tour.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {tour.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Giá: {tour.price} VND
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Từ: {tour.startDate} - Đến: {tour.endDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tour.descriptionTour}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
        />
      )}
    </Container>
  );
}
