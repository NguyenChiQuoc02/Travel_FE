import axios from "axios";
import { API_END_POINT } from "../api";

const token = localStorage.getItem("accessToken") || "";

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
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return null;
  }
};

export const createTour = async (tourData: any, id: number) => {
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
    console.error("Error creating tour:", error);
    return null;
  }
};

export const editTour = async (
  tourData: any,
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
    console.error("Error update tour:", error);
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
    console.error("Error creating tour:", error);
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
