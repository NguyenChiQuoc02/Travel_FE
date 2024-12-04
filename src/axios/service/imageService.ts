import axios from 'axios';
import { API_END_POINT } from "../api";


export const viewImage = async (image: string)=> {
  try {
    const response = await axios.get(`${API_END_POINT}/image/viewImage/${image}`, {
    });
    // return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
