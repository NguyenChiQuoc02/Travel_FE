"use client";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { destinationService } from "@/axios/service";
import { useRouter } from "next/navigation";

export default function HDestination() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();
  interface Destination {
    destinationId: number;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
  }

  const itemsPerPage = 6;

  useEffect(() => {
    destinationService
      .fetchDestination(page, itemsPerPage)
      .then((data) => {
        if (data && data.data.items) {
          setDestinations(data.data.items);
          setTotalPages(data.data.totalPages);
        } else {
          setDestinations([]);
          setTotalPages(1);
        }
      })
      .catch((error) => {
        setDestinations([]);
      });
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleNavigate = (id: number) => {
    router.push(`/home/destinaion/${id}`);
  };

  return (
    <Container sx={{ justifyContent: "center", marginTop: 5 }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Điểm đến hấp dẫn
      </h1>
      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {destinations.map((destination) => (
          <Grid item xs={12} sm={4} md={4} key={destination.destinationId}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:8080/image/viewImage/${destination.imageUrl}`}
                  alt={destination.name}
                  onClick={() => handleNavigate(destination.destinationId)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {destination.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {destination.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={totalPages - 1}
        page={page}
        onChange={handlePageChange}
        sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
      />
    </Container>
  );
}
