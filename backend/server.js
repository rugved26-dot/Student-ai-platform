const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const aiRoutes = require('./routes/aiRoutes');
app.use('/api', aiRoutes);

app.get('/', (req, res) => {
  res.send('Student AI Platform Backend API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
