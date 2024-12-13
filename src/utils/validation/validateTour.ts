import { ChangeTour } from "@/axios/data.type/tour";

export const validateTourData = (tourData: ChangeTour) => {
  if (!tourData.name.trim()) {
    return "Tên tour không được để trống!";
  }
  if (
    !tourData.price ||
    isNaN(Number(tourData.price)) ||
    Number(tourData.price) <= 0
  ) {
    return "Giá tour phải là số và lớn hơn 0!";
  }
  if (!tourData.startDate || !tourData.endDate) {
    return "Ngày bắt đầu và ngày kết thúc không được để trống!";
  }
  if (new Date(tourData.startDate) >= new Date(tourData.endDate)) {
    return "Ngày bắt đầu phải trước ngày kết thúc!";
  }
  if (!tourData.descriptionTour.trim()) {
    return "Mô tả tour không được để trống!";
  }
  return null;
};
