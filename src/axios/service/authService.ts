import axios from "axios";
import { API_END_POINT } from "../api";
import { ILogin } from "../data.type/auth";

const LOGIN_API_URL = `${API_END_POINT}/api/auth/login`;
const REGISTER_API_URL = `${API_END_POINT}/api/auth/register`;

export const login = async (
  username: string,
  password: string
): Promise<ILogin> => {
  try {
    const response = await axios.post<ILogin>(LOGIN_API_URL, {
      username,
      password,
    });

    const { accessToken, ...users } = response.data;
    const { roles } = response.data;

    localStorage.setItem("accessToken", `${accessToken}`);
    localStorage.setItem("userAuth", roles.join(" "));
    localStorage.setItem("userInfo", JSON.stringify(users));
    return response.data;
  } catch (error) {
    console.log("Đăng nhập thất bại:", error);
    throw error;
  }
};

export const register = async (
  username: string,
  password: string,
  email: string,
  phoneNumber: string
): Promise<string> => {
  try {
    const response = await axios.post<string>(REGISTER_API_URL, {
      username,
      password,
      email,
      phoneNumber: phoneNumber.toString(),
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Đăng ký thất bại:", error);
    throw error;
  }
};
