import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

const HFooter: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        py: 3,
        mt: 5,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {"© "}
          <Link color="inherit" href="http://localhost:3000/home">
            Nguyễn Chí Quốc
          </Link>{" "}
          {new Date().getFullYear()}.
        </Typography>
      </Container>
    </Box>
  );
};

export default HFooter;
