// app.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to DB
await connectDB();

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} at http://localhost:${PORT}` ));