// app.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import userRoutes from "./routes/userRoutes.js";
import todoRoute from './routes/todoRoutes.js';
import {errorHandler} from "./middlewares/errorMiddleware.js"
import { apiLimiter } from './middlewares/rateLimiter.js';
import { swaggerDocs } from './middlewares/swagger.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/', apiLimiter);


//make sure the error handler middleware is the last middleware

// Connect to DB
await connectDB();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */
// Routes
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use(errorHandler)
swaggerDocs(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} at http://localhost:${PORT}` ));