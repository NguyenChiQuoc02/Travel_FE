import axios from "axios";
import { API_END_POINT } from "../api";

const token = localStorage.getItem("accessToken") || "";

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
    console.log("Error fetching destinations:", error);
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
    console.log("Error fetching destination by ID:", error);
    return null;
  }
};

export const fetchDestinations = async () => {
  try {
    const url = `${API_END_POINT}/admin/destination/list`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error get list destination", error);
    return null;
  }
};

export const createDestination = async (
  name: string,
  description: string,
  location: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("location", location);

  try {
    const response = await axios.post(
      `${API_END_POINT}/admin/destination`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Có lỗi khi tạo điểm đến:", error);
    throw error;
  }
};

export const editDestination = async (
  id: string,
  name: string,
  description: string,
  location: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("location", location);

  try {
    const response = await axios.put(
      `${API_END_POINT}/admin/destination/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Có lỗi khi sua điểm đến:", error);
    throw error;
  }
};

export const deleteDestination = async (id: number) => {
  try {
    const url = `${API_END_POINT}/admin/destination/${id}`;
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
