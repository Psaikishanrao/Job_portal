const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./Routes/jobRoutes');

require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/jobs', jobRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
