"use client";

import BookingList from "@/components/admin/Booking/Booking";
import { useForm, FormProvider } from "react-hook-form";

const Booking: React.FC = () => {
  const methods = useForm();
  return (
    <>
      <FormProvider {...methods}>
        <BookingList />
      </FormProvider>
    </>
  );
};

export default Booking;
