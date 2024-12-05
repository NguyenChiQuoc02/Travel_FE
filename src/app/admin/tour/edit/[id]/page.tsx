"use client";

import { useParams } from "next/navigation";
import EditTour from "@/components/admin/Tour/EditTour";
const UpdateTour = () => {
  const params = useParams();
  const id = params?.id as string;
  return (
    <>
      <EditTour id={parseInt(id, 10)} />
    </>
  );
};

export default UpdateTour;
