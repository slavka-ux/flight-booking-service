import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as flightController from '../controllers/flightController';
import * as bookingController from '../controllers/bookingController';

const router = Router();

// Auth Routes
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.put('/auth/profile', authController.updateProfile);

// Flight Routes
router.get('/flights', flightController.searchFlights);
router.get('/flights/:id', flightController.getFlightById);

// Booking Routes
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.put('/bookings/:id/cancel', bookingController.cancelBooking);

export default router;
