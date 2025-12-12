// src/server.js
import express from 'express';
import { errors } from 'celebrate'; // Імпорт обробника помилок валідації
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// Routes
// Важливо: ми монтуємо роутер на шляху '/notes'.
// Це означає, що всі маршрути всередині notesRoutes будуть починатися з /notes
app.use('/notes', notesRoutes);

// Error handlers
// 1. Спочатку обробляємо помилки валідації від Celebrate
app.use(errors());

// 2. Потім обробляємо 404 (якщо маршрут не знайдено)
app.use(notFoundHandler);

// 3. В кінці загальний обробник помилок (500 та інші)
app.use(errorHandler);

// Connect to MongoDB and start server
connectMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to start server:', error);
        process.exit(1);
    });