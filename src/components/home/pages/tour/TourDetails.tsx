import React, { useEffect, useState } from "react";
import { tourService } from "@/axios/service/index";
import { reviewService } from "@/axios/service/index";
import { imageService } from "@/axios/service/index";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const TourDetail: React.FC<{ id: number }> = ({ id }) => {
  const [tour, setTour] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const getTourDetails = async () => {
      const data = await tourService.fetchTourById(id);
      setTour(data?.data);

      // Lấy danh sách review theo destinationId
      const destinationId = data?.data?.destination?.destinationId;
      if (destinationId) {
        const reviewsData = await reviewService.fetchReviewByDestinationId(
          destinationId
        );

        setReviews(reviewsData.data || []);
      }
    };

    getTourDetails();
  }, [id]);

  const viewImage = (url: string) => {
    imageService.viewImage(url);
  };

  if (!tour) return <div>Loading...</div>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ display: "flex", flexDirection: "column", mb: 3 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={5}>
            <CardMedia
              component="img"
              sx={{ height: 300, objectFit: "cover" }}
              image={`http://localhost:8080/image/viewImage/${tour.destination.imageUrl}`}
              alt={tour.destination.name}
            />
          </Grid>

          <Grid size={7}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {tour.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {tour.descriptionTour}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Price:</strong> {tour.price} VND
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Start Date:</strong>{" "}
                {new Date(tour.startDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>End Date:</strong>{" "}
                {new Date(tour.endDate).toLocaleDateString()}
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="h6" gutterBottom>
                Destination: {tour.destination.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Description:</strong> {tour.destination.description}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Location:</strong> {tour.destination.location}
              </Typography>
              <Button
                sx={{ textAlign: "center" }}
                variant="contained"
                href="/customer/booking"
              >
                Đặt tour
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          {reviews.length > 0 ? (
            <List>
              {reviews.map((review: any, index: number) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`Rating: ${review.rating} ⭐`}
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <strong>{review.user.name}</strong>:{" "}
                            {review.comment}
                          </Typography>
                          {" — "}
                          {review.reviewDate
                            ? new Date(review.reviewDate).toLocaleDateString()
                            : ""}
                        </>
                      }
                    />
                  </ListItem>
                  {index < reviews.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No reviews available for this destination.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default TourDetail;
