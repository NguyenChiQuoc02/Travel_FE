import axios from "axios";
import { API_END_POINT } from "../api";

interface LoginResponse {
  accessToken: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
  tokenType: string;
}
interface Register {
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
}

const LOGIN_API_URL = `${API_END_POINT}/api/auth/login`;
const REGISTER_API_URL = `${API_END_POINT}/api/auth/register`;

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(LOGIN_API_URL, {
      username,
      password,
    });

    const { accessToken, tokenType } = response.data;

    localStorage.setItem("accessToken", `${tokenType} ${accessToken}`);

    return response.data;
  } catch (error) {
    console.error("Đăng nhập thất bại:", error);
    throw error;
  }
};

export const register = async (
  username: string,
  password: string,
  email: string,
  phoneNumber: string
): Promise<Register> => {
  try {
    const response = await axios.post<Register>(REGISTER_API_URL, {
      username,
      password,
      email,
      phoneNumber: phoneNumber.toString(),
    });

    console.log("Đăng ký thành công! >>> ", response.data);
    return response.data;
  } catch (error) {
    console.error("Đăng ký thất bại:", error);
    throw error;
  }
};
