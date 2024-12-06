import axios from "axios";
import { API_END_POINT } from "../api";

const token = localStorage.getItem("accessToken") || "";

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
    console.log("Error creating booking:", error);
  }
};

export const fetchListBooking = async () => {
  try {
    const url = `${API_END_POINT}/customer/booking/current-user`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error get list booking", error);
    return null;
  }
};

export const fetchTotalBooking = async () => {
  try {
    const url = `${API_END_POINT}/customer/booking/total/current-user`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("check data total", response.data);
    return response.data;
  } catch (error) {
    console.log("Error get total booking", error);
    return null;
  }
};
