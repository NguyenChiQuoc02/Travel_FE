"use client";

import HImage from "@/components/home/content/HImage";
import HTour from "@/components/home/pages/tour/HomeTour";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <HImage />
      <HTour />
    </Container>
  );
}
