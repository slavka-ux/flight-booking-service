import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as flightController from '../controllers/flightController';
import * as bookingController from '../controllers/bookingController';
import { authLimiter } from '../middlewares/rateLimiter';
import { validateRegister, validateBooking } from '../middlewares/validator';

const router = Router();

// Auth Routes
router.post('/auth/login', authLimiter, authController.login);
router.post('/auth/register', authLimiter, validateRegister, authController.register);
router.put('/auth/profile', authController.updateProfile);

// Flight Routes
router.get('/flights', flightController.searchFlights);
router.get('/flights/:id', flightController.getFlightById);

// Booking Routes
router.post('/bookings', validateBooking, bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.put('/bookings/:id/cancel', bookingController.cancelBooking);

export default router;
