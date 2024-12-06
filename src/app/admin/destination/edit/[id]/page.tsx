"use client";

import { EditDestination } from "@/components/admin/destination/EditDestination";
import { useParams } from "next/navigation";
const UpdateTour = () => {
  const params = useParams();
  const id = params?.id as string;
  return (
    <>
      <EditDestination id={parseInt(id, 10)} />
    </>
  );
};

export default UpdateTour;
