
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const uploadRoute = require('./routes/upload');
const insightsRoute = require('./routes/insights');
const authRoutes = require('./routes/auth');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" MongoDB connected"))
.catch((err) => console.error(" MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use('/api/upload', uploadRoute);
app.use('/api/insights', insightsRoute);
app.use('/api/auth', authRoutes);




module.exports = app;
