// components/Intro.tsx
import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { blue } from "@mui/material/colors";

const destinations = [
  {
    name: "Hồ Chí Minh",
    description: "Khám phá thành phố năng động và nhộn nhịp nhất Việt Nam.",
  },
  {
    name: "Đà Nẵng",
    description:
      "Thành phố biển xinh đẹp với những bãi biển dài và núi non hùng vĩ.",
  },
  {
    name: "Hà Nội",
    description: "Thủ đô nghìn năm văn hiến với lịch sử và văn hóa phong phú.",
  },
];

const Intro: React.FC = () => {
  return (
    <Box sx={{ py: 6, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        {/* Tiêu đề giới thiệu */}
        <Typography variant="h3" gutterBottom align="center" color="primary">
          Chào mừng đến với Trang Du Lịch của Chúng Tôi!
        </Typography>
        <Typography
          variant="h5"
          paragraph
          align="center"
          color="text.secondary"
        >
          Khám phá các điểm đến tuyệt vời và lên kế hoạch cho chuyến đi trong mơ
          của bạn.
        </Typography>

        {/* Các điểm đến nổi bật */}
        <Grid container spacing={4} justifyContent="center">
          {destinations.map((destination, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {destination.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {destination.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={`/home/destination`}
                >
                  Khám Phá
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Intro;
