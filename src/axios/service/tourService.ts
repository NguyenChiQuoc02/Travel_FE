import axios from "axios";
import { API_END_POINT } from "../api";

const token = localStorage.getItem("accessToken");

export const fetchTourById = async (id: number) => {
  try {
    const url = `${API_END_POINT}/home/tour/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching tour by ID:", error);
    return null;
  }
};

export const fetchTours = async (
  page?: number,
  size?: number,
  name?: string
) => {
  try {
    let url = `${API_END_POINT}/home/tour?page=${page || 1}&size=${size || 10}`;

    if (name) {
      url += `&name=${name}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return null;
  }
};


