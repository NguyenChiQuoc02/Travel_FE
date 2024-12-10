import React, { useEffect, useState } from "react";
import { tourService } from "@/axios/service/index";
import { reviewService } from "@/axios/service/index";
import Grid from "@mui/material/Grid";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Button,
  Box,
  Rating,
} from "@mui/material";
import QuickBooking from "./QuickBooking";
import { useRouter } from "next/navigation";
import { API_END_POINT } from "@/axios/api";
import AddReview from "./AddReview";
const TourDetail: React.FC<{ id: number }> = ({ id }) => {
  const [tour, setTour] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [openbook, setOpenBook] = useState<boolean>(false);
  const [openAddReview, setOpenAddReview] = useState<boolean>(false); // State to control AddReview modal

  const router = useRouter();
  const getTourDetails = async () => {
    const data = await tourService.fetchTourById(id);
    setTour(data?.data);
    const destinationId = data?.data?.destination?.destinationId;
    if (destinationId) {
      const reviewsData =
        await reviewService.fetchReviewByDestinationId(destinationId);

      setReviews(reviewsData.data || []);
    }
  };
  useEffect(() => {
    getTourDetails();
  }, [id]);

  const handleOpenBook = () => {
    const storedUsers = localStorage.getItem("userInfo");
    if (storedUsers && JSON.parse(storedUsers).roles[0] === "ROLE_CUSTOMER") {
      setOpenBook(true);
    } else {
      alert("Vui lòng đăng nhập trước đi đặt tour");
      router.push("/home/login");
    }
  };

  const handleCloseBook = () => {
    setOpenBook(false);
  };
  const handleAddReview = () => {
    const storedUsers = localStorage.getItem("userInfo");
    if (storedUsers && JSON.parse(storedUsers).roles[0] === "ROLE_CUSTOMER") {
      setOpenAddReview(true);
    } else {
      alert("Vui lòng đăng nhập trước đi đánh giá");
      router.push("/home/login");
    }
  };

  const handleCloseAddReview = () => {
    setOpenAddReview(false);
    getTourDetails();
  };
  if (!tour) return <div>Loading...</div>;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Card sx={{ p: 3, mb: 4, backgroundColor: "#f9f9f9" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <CardMedia
              component="img"
              sx={{
                borderRadius: 2,
                height: 300,
                objectFit: "cover",
                boxShadow: 3,
              }}
              image={`${API_END_POINT}/image/viewImage/${tour.destination.imageUrl}`}
              alt={tour.destination.name}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <CardContent>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {tour.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {tour.descriptionTour}
              </Typography>
              <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                  <strong>Giá:</strong> {tour.price.toLocaleString()} VND
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Ngày khởi hành:</strong>{" "}
                  {new Date(tour.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Ngày kết thúc:</strong>{" "}
                  {new Date(tour.endDate).toLocaleDateString()}
                </Typography>
              </Box>
              <Box mt={4}>
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  color="primary"
                  onClick={handleOpenBook}
                >
                  Đặt tour nhanh
                </Button>
                {/* <Button
                  variant="outlined"
                  color="secondary"
                  href="/home/booking"
                >
                  Thêm vào giỏ hàng
                </Button> */}
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{ p: 3, mb: 4, backgroundColor: "#f3f4f6" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Điểm đến: {tour.destination.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          <strong>Mô tả:</strong> {tour.destination.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Vị trí:</strong> {tour.destination.location}
        </Typography>
        <Typography>
          <Button onClick={handleAddReview}>Thêm đánh giá</Button>
        </Typography>
      </Card>

      <Card sx={{ p: 3, backgroundColor: "#ffffff", boxShadow: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Đánh giá
        </Typography>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Card
              key={index}
              sx={{ mb: 2, p: 2, backgroundColor: "#f9f9f9", boxShadow: 1 }}
            >
              <Typography variant="body1" gutterBottom>
                <strong>{review.user.name}</strong>: {review.comment}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ justifyItems: "center" }}
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={review.rating}
                  precision={1}
                  readOnly
                />
                <strong
                  style={{
                    display: "inline-block",

                    margin: "10px 0 10px 15px ",
                  }}
                >
                  {review.reviewDate
                    ? new Date(review.reviewDate).toLocaleDateString()
                    : ""}
                </strong>
              </Typography>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            Chưa có đánh giá nào
          </Typography>
        )}
      </Card>
      <QuickBooking
        open={openbook}
        onClose={handleCloseBook}
        price={tour.price}
        tourId={tour.tourId}
      />
      <AddReview
        open={openAddReview}
        onClose={handleCloseAddReview}
        destinationId={tour.destination.destinationId}
      />
    </Container>
  );
};

export default TourDetail;
