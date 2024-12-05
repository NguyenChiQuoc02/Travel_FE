"use client";
import { tourService } from "@/axios/service";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

interface TourDestinationProps {
  desId: number;
  onBack: () => void;
}

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

const TourDestination: React.FC<TourDestinationProps> = ({ desId, onBack }) => {
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [tours, setTours] = useState<Tour[]>([]);
  const router = useRouter();

  useEffect(() => {
    tourService
      .fetchTourByDestinationId(desId)
      .then((data) => {
        console.log("check data id tour >>>>", data);
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
      <Button variant="contained" color="primary" onClick={onBack}>
        Trở lại
      </Button>
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

      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(event, value) => handlePageChange(event, value - 1)} // Điều chỉnh để truyền đúng giá trị cho state
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      />
    </Container>
  );
};

export default TourDestination;
