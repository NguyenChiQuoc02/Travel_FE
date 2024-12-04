"use client";

import HImage from "@/components/home/content/HImage";
import HDestination from "@/components/home/pages/destination/HomeDestination";
import HTour from "@/components/home/pages/tour/HomeTour";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <HImage />
      {/* <HDestination /> */}
      <HTour />
    </Container>
  );
}
