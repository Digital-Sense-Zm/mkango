export interface Room {
  id: string;
  title: string;
  category: string;
  slug: string;
  summary: string;
  pricePerNightZMW: number;
  pricePerNightUSD: number;
  featuredImage: string;
  amenities: string[];
  status: "available" | "booked";
}

export interface BookingPayload {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  paymentMethod: "card" | "mobile_money";
  paymentNetwork?: "mtn" | "airtel" | "zamtel";
  mobileNumber?: string;
  totalAmount: number;
}
