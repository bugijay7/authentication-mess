import express from 'express';
import passport from 'passport';
import { register, login } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../middlewares/validation.js';
import { checkAuth } from '../middlewares/auth.js';

const router = express.Router();

// Registration route
router.post('/register', validateRegister, register);

// Login route using Passport local strategy
router.post('/login', validateLogin, passport.authenticate('local'), login);

// Auth check route (protected)
router.get('/check-auth', checkAuth, (req, res) => {
  res.status(200).json({ message: 'Authenticated', user: req.user });
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

export default router;
