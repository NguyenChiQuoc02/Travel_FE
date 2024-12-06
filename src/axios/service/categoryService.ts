import axios from "axios";
import { API_END_POINT } from "../api";

const token = localStorage.getItem("accessToken") || "";

interface CategoryParams {
  page: number;
  size: number;
}

export const fetchCategories = async (params: CategoryParams) => {
  if (!token) {
    console.log("Token not found in localStorage");
    return;
  }
  try {
    const response = await axios.get(`${API_END_POINT}/admin/category`, {
      params: {
        page: params.page,
        size: params.size,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    // console.log('Categories:', response.data);
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
};
