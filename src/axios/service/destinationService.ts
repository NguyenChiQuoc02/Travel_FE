import axios from "axios";
import { API_END_POINT } from "../api";

const token = localStorage.getItem("accessToken");

export const fetchDestination = async (
  page?: number,
  size?: number,
  name?: string
) => {
  try {
    let url = `${API_END_POINT}/home/destination?page=${page || 0}&size=${
      size || 10
    }`;

    if (name) {
      url += `&name=${name}`;
    }

    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return null;
  }
};

export const fetchDestinationById = async (id: number) => {
  try {
    const url = `${API_END_POINT}/home/destination/${id}`;
    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching destination by ID:", error);
    return null;
  }
};
