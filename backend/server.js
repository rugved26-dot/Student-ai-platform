const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: "https://student-ai-platform-rose.vercel.app/" }));
app.use(express.json());

// Routes
const aiRoutes = require('./routes/aiRoutes');
app.use('/api', aiRoutes);

app.get('/', (req, res) => {
  res.send('Student AI Platform Backend API is running!');
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
