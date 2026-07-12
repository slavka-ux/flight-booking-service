import { Request, Response } from 'express';
import prisma from '../config/db';

export const searchFlights = async (req: Request, res: Response) => {
  try {
    const { origin, destination, classType } = req.query;
    
    const flights = await prisma.flight.findMany({
      where: {
        ...(origin ? { origin: String(origin).toUpperCase() } : {}),
        ...(destination ? { destination: String(destination).toUpperCase() } : {}),
        ...(classType ? { classType: String(classType) } : {})
      }
    });
    
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching flights' });
  }
};

export const getFlightById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const flight = await prisma.flight.findUnique({ where: { id } });
    
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
