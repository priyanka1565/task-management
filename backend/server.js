const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://priyankaingle250:priya1565@cluster0.zrm5cra.mongodb.net/task_application')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
