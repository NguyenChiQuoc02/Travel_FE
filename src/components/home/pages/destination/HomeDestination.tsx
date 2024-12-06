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
import { destinationService, tourService } from "@/axios/service";
import { useRouter } from "next/navigation";
import TourDestination from "./TourDestination";

export default function HDestination() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [desId, setDesId] = useState<number>(0);
  const [nav, setNav] = useState<boolean>(false);
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
    setNav(true);
    setDesId(id);
  };

  const handleBack = () => {
    setNav(false);
  };
  return (
    <>
      {nav ? (
        <TourDestination desId={desId} onBack={handleBack} />
      ) : (
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
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {destination.description}
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
      )}
    </>
  );
}
