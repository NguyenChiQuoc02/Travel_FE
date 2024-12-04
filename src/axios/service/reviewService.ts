import axios from "axios";
import { API_END_POINT } from "../api";

const token = localStorage.getItem("accessToken");

export const fetchReviewByDestinationId = async (id: number) => {
  try {
    const url = `${API_END_POINT}/home/review/destination/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching review by ID:", error);
    return null;
  }
};

export const fetchReviews = async (
  page?: number,
  size?: number,
  name?: string
) => {
  try {
    let url = `${API_END_POINT}/home/review?page=${page || 1}&size=${
      size || 10
    }`;

    if (name) {
      url += `&name=${name}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};
