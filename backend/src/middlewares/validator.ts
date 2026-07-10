import { Request, Response, NextFunction } from 'express';

// Спрощений приклад валідації реєстрації
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, fullName } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  if (!fullName || fullName.trim().length === 0) {
    return res.status(400).json({ message: 'Full name is required' });
  }

  next();
};

export const validateBooking = (req: Request, res: Response, next: NextFunction) => {
  const { flightId, passengerName, passengerPassport } = req.body;

  if (!flightId || !passengerName || !passengerPassport) {
    return res.status(400).json({ message: 'Missing required booking fields' });
  }

  next();
};
