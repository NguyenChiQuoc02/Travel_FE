"use client";

import TourDetail from "@/components/home/pages/tour/TourDetails";
import { useParams } from "next/navigation";

const TourDetails = () => {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return <div>Error: Missing ID</div>;
  }

  return (
    <>
      <TourDetail id={parseInt(id, 10)} />
    </>
  );
};

export default TourDetails;
