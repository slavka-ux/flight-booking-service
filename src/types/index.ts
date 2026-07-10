export interface User {
  id: string;
  email: string;
  fullName: string;
  passportNumber?: string;
  phone?: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineLogoUrl?: string;
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string; // e.g., "6h 30m"
  price: number;
  stops: number;
  classType: 'Economy' | 'Business' | 'First';
}

export interface Booking {
  id: string;
  userId: string;
  flightId: string;
  flight: Flight;
  passengerName: string;
  passengerPassport: string;
  passengerPhone: string;
  seatNumber: string;
  bookingDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

export interface SearchQuery {
  origin: string;
  destination: string;
  departureDate: string;
  classType: 'Economy' | 'Business' | 'First';
}
