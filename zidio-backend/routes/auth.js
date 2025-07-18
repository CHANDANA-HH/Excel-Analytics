const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// REGISTER
router.post('/register', async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  try {
    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, phone, email, passwordHash });
    await newUser.save();

    console.log("Registered:", email);
    res.json({ message: 'Registration successful' });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) return res.status(400).json({ error: 'Invalid email/phone or password' });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(400).json({ error: 'Invalid email/phone or password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, firstName: user.firstName });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// FORGOT PASSWORD
router.post('/forgot-password', async (req, res) => {
  const { emailOrPhone } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    if (!user) {
      return res.json({ message: 'If an account exists, instructions have been sent.' });
    }

    if (emailOrPhone.includes('@')) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      const resetLink = `http://localhost:5173/reset-password/${token}`;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: emailOrPhone,
        subject: 'Reset your password',
        html: `<p>Hi ${user.firstName},</p><p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
      });

      console.log(` Sent  reset email to: ${emailOrPhone}`);
    } 

    res.json({ message: 'If an account exists, instructions have been sent.' });

  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

// RESET PASSWORD
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ error: 'Invalid or expired link' });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 's Password has been reset successfully.' });

  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(400).json({ error: 'Invalid or expired link.' });
  }
});

module.exports = router;
