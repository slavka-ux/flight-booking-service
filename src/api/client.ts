/// <reference types="vite/client" />
import axios from 'axios';
import { Flight, Booking, User } from '../types';
import { AIRPORTS } from '../data/airports';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set auth header token if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- MOCK DATABASE AND LOGIC FOR DEMO ---
const getMockUsers = (): any[] => JSON.parse(localStorage.getItem('mock_users') || '[]');
const saveMockUsers = (users: any[]) => localStorage.setItem('mock_users', JSON.stringify(users));

const getMockBookings = (): Booking[] => JSON.parse(localStorage.getItem('mock_bookings') || '[]');
const saveMockBookings = (bookings: Booking[]) => localStorage.setItem('mock_bookings', JSON.stringify(bookings));

const MOCK_FLIGHTS: Flight[] = [
  { id: 'f1', flightNumber: 'AG-101', airline: 'AeroGlide Express', origin: 'LHR', originName: 'London Heathrow', destination: 'JFK', destinationName: 'New York JFK', departureTime: '08:30 AM', arrivalTime: '11:45 AM', duration: '8h 15m', price: 499, stops: 0, classType: 'Economy' },
  { id: 'f2', flightNumber: 'AG-102', airline: 'AeroGlide Express', origin: 'LHR', originName: 'London Heathrow', destination: 'JFK', destinationName: 'New York JFK', departureTime: '02:15 PM', arrivalTime: '05:30 PM', duration: '8h 15m', price: 850, stops: 0, classType: 'Business' },
  { id: 'f3', flightNumber: 'AG-201', airline: 'SkyLine Airways', origin: 'CDG', originName: 'Paris Charles de Gaulle', destination: 'NRT', destinationName: 'Tokyo Narita', departureTime: '11:00 AM', arrivalTime: '07:30 AM', duration: '11h 30m', price: 1250, stops: 1, classType: 'Economy' },
  { id: 'f4', flightNumber: 'AG-202', airline: 'SkyLine Airways', origin: 'CDG', originName: 'Paris Charles de Gaulle', destination: 'NRT', destinationName: 'Tokyo Narita', departureTime: '09:00 PM', arrivalTime: '04:30 PM', duration: '10h 30m', price: 3400, stops: 0, classType: 'First' },
  { id: 'f5', flightNumber: 'UA-301', airline: 'UkraWings', origin: 'KBP', originName: 'Kyiv Boryspil', destination: 'LHR', destinationName: 'London Heathrow', departureTime: '06:00 AM', arrivalTime: '08:20 AM', duration: '3h 20m', price: 180, stops: 0, classType: 'Economy' }
];

const getMockFlights = (): Flight[] => {
  const cached = localStorage.getItem('mock_all_flights');
  if (cached) return JSON.parse(cached);
  localStorage.setItem('mock_all_flights', JSON.stringify(MOCK_FLIGHTS));
  return MOCK_FLIGHTS;
};
const saveMockFlights = (flights: Flight[]) => localStorage.setItem('mock_all_flights', JSON.stringify(flights));

const isBackendOffline = async (): Promise<boolean> => {
  try {
    await axios.get(`${API_URL}/health`, { timeout: 1000 });
    return false;
  } catch (err) {
    return true;
  }
};

export const authAPI = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    if (await isBackendOffline()) {
      const users = getMockUsers();
      const user = users.find(u => u.email === email);
      if (!user) throw new Error('User not found');
      const token = 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);
      return { token, user: { id: user.id, email: user.email, fullName: user.fullName, passportNumber: user.passportNumber, phone: user.phone } };
    }
    const res = await client.post('/auth/login', { email, password });
    return res.data;
  },

  register: async (fullName: string, email: string, password: string): Promise<{ token: string; user: User }> => {
    if (await isBackendOffline()) {
      const users = getMockUsers();
      if (users.some(u => u.email === email)) throw new Error('Email is already registered');
      const newUser = { id: 'user_' + Math.random().toString(36).substr(2, 9), email, fullName, password, passportNumber: '', phone: '' };
      users.push(newUser);
      saveMockUsers(users);
      const token = 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);
      return { token, user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName } };
    }
    const res = await client.post('/auth/register', { fullName, email, password });
    return res.data;
  },

  updateProfile: async (fullName: string, passportNumber?: string, phone?: string): Promise<{ user: User }> => {
    const activeUserStr = localStorage.getItem('user');
    if (!activeUserStr) throw new Error('Unauthorized');
    const activeUser = JSON.parse(activeUserStr) as User;

    if (await isBackendOffline()) {
      const users = getMockUsers();
      const userIdx = users.findIndex(u => u.id === activeUser.id);
      const updatedUser = { ...activeUser, fullName, passportNumber, phone };
      if (userIdx !== -1) {
        users[userIdx] = { ...users[userIdx], fullName, passportNumber, phone };
        saveMockUsers(users);
      }
      return { user: updatedUser };
    }
    const res = await client.put('/auth/profile', { fullName, passportNumber, phone });
    return res.data;
  }
};

export const flightsAPI = {
  search: async (params: { origin: string; destination: string; departureDate?: string; classType?: string }): Promise<Flight[]> => {
    if (await isBackendOffline()) {
      let allFlights = getMockFlights();
      let matches = allFlights.filter(flight => 
        flight.origin.toLowerCase() === params.origin.toLowerCase() && 
        flight.destination.toLowerCase() === params.destination.toLowerCase() &&
        (!params.classType || flight.classType === params.classType)
      );

      if (matches.length === 0) {
        const originAir = AIRPORTS.find(a => a.code.toLowerCase() === params.origin.toLowerCase());
        const destAir = AIRPORTS.find(a => a.code.toLowerCase() === params.destination.toLowerCase());

        if (originAir && destAir) {
          const generated: Flight[] = [];
          const count = Math.floor(Math.random() * 3) + 2; 
          for (let i = 0; i < count; i++) {
            const airlines = ['AeroGlide Express', 'Global Airways', 'SkyLine Airlines', 'Oceanic Air', 'Continental Wings'];
            const airline = airlines[Math.floor(Math.random() * airlines.length)];
            const priceBase = params.classType === 'First' ? 1200 : params.classType === 'Business' ? 600 : 200;
            const flight: Flight = {
              id: 'f_gen_' + Math.random().toString(36).substr(2, 9),
              flightNumber: airline.substring(0,2).toUpperCase() + '-' + Math.floor(Math.random() * 900 + 100),
              airline,
              origin: originAir.code,
              originName: originAir.name,
              destination: destAir.code,
              destinationName: destAir.name,
              departureTime: `${Math.floor(Math.random()*12+1).toString().padStart(2, '0')}:${['00','15','30','45'][Math.floor(Math.random()*4)]} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
              arrivalTime: `${Math.floor(Math.random()*12+1).toString().padStart(2, '0')}:${['00','15','30','45'][Math.floor(Math.random()*4)]} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
              duration: `${Math.floor(Math.random()*12+2)}h ${['00','15','30','45'][Math.floor(Math.random()*4)]}m`,
              price: priceBase + Math.floor(Math.random() * 300),
              stops: Math.random() > 0.6 ? 1 : 0,
              classType: (params.classType as any) || 'Economy'
            };
            generated.push(flight);
          }
          matches = generated;
          allFlights = [...allFlights, ...generated];
          saveMockFlights(allFlights);
        }
      }
      return matches;
    }
    const res = await client.get('/flights', { params });
    return res.data;
  },
  getById: async (id: string): Promise<Flight> => {
    if (await isBackendOffline()) {
      const flight = getMockFlights().find(f => f.id === id);
      if (!flight) throw new Error('Flight not found');
      return flight;
    }
    const res = await client.get(`/flights/${id}`);
    return res.data;
  }
};

export const bookingsAPI = {
  create: async (bookingData: { flightId: string; passengerName: string; passengerPassport: string; passengerPhone: string; seatNumber: string; }): Promise<Booking> => {
    const activeUserStr = localStorage.getItem('user');
    if (!activeUserStr) throw new Error('Unauthorized');
    const activeUser = JSON.parse(activeUserStr) as User;

    if (await isBackendOffline()) {
      const flight = getMockFlights().find(f => f.id === bookingData.flightId);
      if (!flight) throw new Error('Selected flight not found');

      const newBooking: Booking = {
        id: 'booking_' + Math.random().toString(36).substr(2, 9),
        userId: activeUser.id,
        flightId: bookingData.flightId,
        flight,
        passengerName: bookingData.passengerName,
        passengerPassport: bookingData.passengerPassport,
        passengerPhone: bookingData.passengerPhone,
        seatNumber: bookingData.seatNumber,
        bookingDate: new Date().toISOString().split('T')[0],
        status: 'Confirmed'
      };

      const bookings = getMockBookings();
      bookings.push(newBooking);
      saveMockBookings(bookings);
      return newBooking;
    }
    const res = await client.post('/bookings', bookingData);
    return res.data;
  },
  getAll: async (): Promise<Booking[]> => {
    const activeUserStr = localStorage.getItem('user');
    if (!activeUserStr) throw new Error('Unauthorized');
    const activeUser = JSON.parse(activeUserStr) as User;

    if (await isBackendOffline()) {
      return getMockBookings().filter(b => b.userId === activeUser.id);
    }
    const res = await client.get('/bookings');
    return res.data;
  },
  cancel: async (bookingId: string): Promise<Booking> => {
    if (await isBackendOffline()) {
      const bookings = getMockBookings();
      const bookingIdx = bookings.findIndex(b => b.id === bookingId);
      if (bookingIdx === -1) throw new Error('Booking not found');
      bookings[bookingIdx].status = 'Cancelled';
      saveMockBookings(bookings);
      return bookings[bookingIdx];
    }
    const res = await client.put(`/bookings/${bookingId}/cancel`);
    return res.data;
  }
};

export default client;
