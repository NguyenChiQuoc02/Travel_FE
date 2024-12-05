import axios from "axios";
import { API_END_POINT } from "../api";

const token = localStorage.getItem("accessToken");

interface BookingParams {
  tourId: number;
  status: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
}

export const createBooking = async (bookingData: BookingParams) => {
  try {
    const response = await axios.post(
      `${API_END_POINT}/customer/booking`,
      {
        tour: {
          tourId: bookingData.tourId,
        },
        status: bookingData.status,
        amount: bookingData.amount,
        paymentMethod: bookingData.paymentMethod,
        paymentStatus: bookingData.paymentStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
  }
};
