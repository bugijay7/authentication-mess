import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { sql } from '../config/db.js';
import bcrypt from 'bcrypt';

passport.use(
  new LocalStrategy(
    { usernameField: 'username' }, // field used for login
    async (username, password, done) => {
      try {
        const result = await sql`SELECT * FROM users WHERE username = ${username}`;
        const user = result[0];

        if (!user) return done(null, false, { message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize and deserialize user to maintain sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    done(null, result[0]);
  } catch (err) {
    done(err, null);
  }
});

// Middleware to protect routes
export const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};
