"use client";

import { bookingService } from "@/axios/service/index";
import { useEffect } from "react";

interface Booking {
  tourId: number;
  status: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
}

export function Booking() {
  return <div>booking customer</div>;
}
