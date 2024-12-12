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
import { tourService } from "@/axios/service";
import { useRouter } from "next/navigation";
import { API_END_POINT } from "@/axios/api";
import { Tour } from "@/axios/data.type/tour";

export default function HTour() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  const itemsPerPage = 6;

  useEffect(() => {
    tourService
      .fetchTours(page, itemsPerPage)
      .then((data) => {
        if (data && data.data.items) {
          setTours(data.data.items);
          console.log(">>>check data>>>", data.data);
          setTotalPages(data.data.totalPages);
        } else {
          setTours([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
        setTours([]);
      });
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleNavigate = (id: number) => {
    router.push(`/home/tour/${id}`);
  };

  return (
    <Container sx={{ justifyContent: "center", marginTop: 5 }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Danh sách tour hấp dẫn
      </h1>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {tours.map((tour) => (
          <Grid item xs={12} sm={4} md={4} key={tour.tourId}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => handleNavigate(tour.tourId)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${API_END_POINT}/image/viewImage/${tour.destination.imageUrl}`}
                  alt={tour.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
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

      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(event, value) => handlePageChange(event, value - 1)}
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      />
    </Container>
  );
}
