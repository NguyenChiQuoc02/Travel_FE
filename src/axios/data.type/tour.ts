export interface ChangeTour {
  name: string;
  price: number;
  startDate: string;
  endDate: string;
  descriptionTour: string;
}

export interface Tour {
  tourId: number;
  name: string;
  price: number;
  startDate: string;
  endDate: string;
  descriptionTour: string;
  destination: {
    destinationId: number;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
  };
}
