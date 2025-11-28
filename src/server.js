import express from 'express';  
import cors from 'cors';
import dotenv from 'dotenv';
import pino from 'pino-http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(pino());

app.get('/notes', (req, res) => {
    res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
    const { noteId } = req.params;
    res.status(200).json({ message: `Retrieved note with id ${noteId}` });
});

app.get('/test-error', () => {throw new Error('imulated server error');});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});