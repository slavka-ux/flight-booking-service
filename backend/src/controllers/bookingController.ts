import { Request, Response } from 'express';
import prisma from '../config/db';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { flightId, passengerName, passengerPassport, passengerPhone, seatNumber } = req.body;
    
    // In real app, userId comes from the authenticated token
    // For demo, we'll fetch the first user or require it in body
    const firstUser = await prisma.user.findFirst();
    const userId = firstUser?.id || "mock-user-id";

    const booking = await prisma.booking.create({
      data: {
        userId,
        flightId,
        passengerName,
        passengerPassport,
        passengerPhone,
        seatNumber
      },
      include: {
        flight: true
      }
    });
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating booking' });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const firstUser = await prisma.user.findFirst();
    const userId = firstUser?.id || "mock-user-id";
    
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { flight: true },
      orderBy: { bookingDate: 'desc' }
    });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const booking = await prisma.booking.update({
      where: { id },
      data: { status: 'Cancelled' },
      include: { flight: true }
    });
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error while cancelling booking' });
  }
};
