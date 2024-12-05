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

export const fetchTourByDestinationId = async (
  id?: number,
  page?: number,
  size?: number
) => {
  try {
    let url = `${API_END_POINT}/home/tour/destination/${id}?page=${
      page || 0
    }&size=${size || 10}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return null;
  }
};

export const fetchTours = async (
  page?: number,
  size?: number,
  name?: string
) => {
  try {
    let url = `${API_END_POINT}/home/tour?page=${page || 0}&size=${size || 10}`;

    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return null;
  }
};

// export const searchTour = async (
//   page?: number,
//   size?: number,
//   name?: string,
//   minPrice?: number,
//   maxPrice?: number,
//   startDate?: string
// ) => {
//   try {
//     let url = `${API_END_POINT}/home/tour/search?page=${page || 1}&size=${
//       size || 10
//     }`;
//     console.log("check >>>>>", minPrice, maxPrice, name, startDate);

//     if (name != undefined) {
//       url += `&name=${name}`;
//     }
//     if (minPrice !== undefined) {
//       url += `&minPrice=${minPrice}`;
//     }
//     if (maxPrice !== undefined) {
//       url += `&maxPrice=${maxPrice}`;
//     }
//     if (startDate != undefined) {
//       url += `&startDate=${startDate}`;
//     }

//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching destinations:", error);
//     return null;
//   }
// };
export const searchTour = async (
  page?: number,
  size?: number,
  name?: string,
  minPrice?: number,
  maxPrice?: number
) => {
  try {
    let url = `${API_END_POINT}/home/tour/search?page=${page || 0}&size=${
      size || 6
    }`;

    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }
    if (minPrice) {
      url += `&name=${encodeURIComponent(minPrice)}`;
    }
    if (maxPrice) {
      url += `&name=${encodeURIComponent(maxPrice)}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error fetching destinations:", error);
    return null;
  }
};
