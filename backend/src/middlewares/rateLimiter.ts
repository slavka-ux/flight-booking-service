import rateLimit from 'express-rate-limit';

// Ліміт для звичайних API запитів (захист від DDoS)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 100, // максимум 100 запитів з однієї IP-адреси
  message: { message: 'Забагато запитів з вашої IP-адреси, спробуйте пізніше.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Суворий ліміт для авторизації (захист від підбору паролів - Brute Force)
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 година
  max: 5, // максимум 5 спроб входу
  message: { message: 'Забагато спроб входу. Ваш IP тимчасово заблоковано на 1 годину.' },
  standardHeaders: true,
  legacyHeaders: false,
});
