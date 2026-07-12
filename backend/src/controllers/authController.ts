import { Request, Response } from 'express';
import prisma from '../config/db';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // In a real app, use bcrypt to compare passwords
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // In a real app, generate a JWT token
    const token = `mock_token_${user.id}`;
    
    res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, passportNumber: user.passportNumber, phone: user.phone } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const user = await prisma.user.create({
      data: { fullName, email, password }
    });
    
    const token = `mock_token_${user.id}`;
    
    res.status(201).json({ token, user: { id: user.id, email: user.email, fullName: user.fullName } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { fullName, passportNumber, phone } = req.body;
    
    // Normally extract user ID from auth token
    // For demo, we just get it from a mock header or assume a default way. 
    // In flight-booking-service, the frontend might send it, or we just rely on mock.
    // Let's assume we can get email from body or we mock it.
    // Since frontend currently expects just { user } back, we'll implement a simple update.
    
    // Warning: This endpoint needs proper authentication middleware in production!
    res.status(200).json({ message: 'Profile updated mock (requires auth middleware to fully work)' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
