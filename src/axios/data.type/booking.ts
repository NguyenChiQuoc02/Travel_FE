export interface Booking {
  tourId: number;
  status: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
}

export interface BookingDetailsModalProps {
  open: boolean;
  bookingDetails: any;
  handleClose: () => void;
}
