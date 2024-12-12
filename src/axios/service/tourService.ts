import axios from "axios";
import { API_END_POINT } from "../api";
import { ChangeTour } from "../data.type/tour";

const token = localStorage.getItem("accessToken");

export const fetchTourById = async (id: number) => {
  try {
    const url = `${API_END_POINT}/home/tour/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error fetching tour by ID:", error);
    return null;
  }
};

export const fetchTourByDestinationId = async (
  id?: number,
  page?: number,
  size?: number
) => {
  try {
    const url = `${API_END_POINT}/home/tour/destination/${id}?page=${
      page || 0
    }&size=${size || 10}`;

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error fetching destinations:", error);
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
    console.log("Error fetching destinations:", error);
    return null;
  }
};

export const fetchToursAdmin = async (
  page?: number,
  size?: number,
  name?: string
) => {
  try {
    let url = `${API_END_POINT}/admin/tour?page=${page || 0}&size=${size || 10}`;

    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching destinations:", error);
    return null;
  }
};

export const createTour = async (tourData: ChangeTour, id: number) => {
  try {
    const url = `${API_END_POINT}/admin/tour?destinationId=${id}`;
    const response = await axios.post(url, tourData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error creating tour:", error);
    return null;
  }
};

export const editTour = async (
  tourData: ChangeTour,
  id: number,
  destinationId: number
) => {
  try {
    const url = `${API_END_POINT}/admin/tour/${id}?destinationId=${destinationId}`;
    const response = await axios.put(url, tourData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error update tour:", error);
    return null;
  }
};

export const deleteTour = async (id: number) => {
  try {
    const url = `${API_END_POINT}/admin/tour/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error creating tour:", error);
    return null;
  }
};

export const searchTour = async (
  page?: number,
  size?: number,
  name?: string
) => {
  try {
    let url = `${API_END_POINT}/home/tour/search?page=${page || 0}&size=${
      size || 6
    }`;

    if (name) {
      url += `&name=${encodeURIComponent(name)}`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Error fetching destinations:", error);
    return null;
  }
};
