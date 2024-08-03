const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const shareRoutes = require('./routes/share');
const app = express();

mongoose.connect('mongodb://localhost:27017/powerbi-clone', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/share', shareRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});