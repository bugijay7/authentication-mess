import bcrypt from 'bcrypt';
import { sql } from '../config/db.js';

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if user exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
    `;

    res.status(201).json({ message: 'User registered successfully' });
  }catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
  
};

export const login = (req, res) => {
  // Passport handles login, this just confirms success
  res.status(200).json({ message: 'Login successful', user: req.user });
};
