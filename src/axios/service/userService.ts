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
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching categories:", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const url = `${API_END_POINT}/customer/user/current-user`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error delete user :", error);
    return null;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const url = `${API_END_POINT}/admin/user/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error delete user :", error);
    return null;
  }
};
