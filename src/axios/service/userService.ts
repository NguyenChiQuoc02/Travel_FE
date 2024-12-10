import axios from "axios";
import { API_END_POINT } from "../api";

const token = localStorage.getItem("accessToken") || "";

interface IUser {
  page: number;
  size: number;
}

export const fetchUsers = async (params: IUser) => {
  if (!token) {
    console.log("Token not found in localStorage");
    return;
  }
  try {
    const response = await axios.get(`${API_END_POINT}/admin/user`, {
      params: {
        page: params.page,
        size: params.size,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
};
