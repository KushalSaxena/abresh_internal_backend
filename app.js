require('dotenv').config(); // This should be at the top of your app.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const workRoutes = require('./routes/workRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reimbursementRoutes = require('./routes/reimbursementsRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const dealRoutes = require('./routes/dealRoutes');
const logisticRoutes = require('./routes/logisticRoutes');
const detailsRoutes = require('./routes/detailsRoutes');
const procurementRoutes = require('./routes/procurementRoutes');
const salesRoutes = require('./routes/salesRoutes');
const commentRoutes = require('./routes/commentRoutes.js');
const leaveRoutes = require('./routes/leaveRoutes');
const cloudinary = require('cloudinary');
const serverPort = process.env.PORT || 3000;

const path = require('path');
const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/works', workRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reimbursement', reimbursementRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/logistic', logisticRoutes);
app.use('/api/details', detailsRoutes);
app.use('/api/procurements', procurementRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api', leaveRoutes);


app.listen(serverPort, '0.0.0.0', () => console.log(`Server running on port ${serverPort}`));

