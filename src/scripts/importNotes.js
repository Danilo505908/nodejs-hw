import dotenv from 'dotenv';
import { connectMongoDB } from '../db/connectMongoDB.js';
import { Note } from '../models/note.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importNotes = async () => {
  try {
    // Підключитися до MongoDB
    await connectMongoDB();

    // Прочитати файл notes.json
    const notesPath = path.join(__dirname, '../../notes.json');
    const notesData = JSON.parse(fs.readFileSync(notesPath, 'utf8'));

    // Очистити колекцію (опціонально - закоментуйте, якщо не хочете видаляти існуючі)
    // await Note.deleteMany({});

    // Додати нотатки в базу
    const result = await Note.insertMany(notesData);

    console.log(`✅ Successfully imported ${result.length} notes!`);
    console.log('📝 Notes:', result.map(note => note.title).join(', '));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing notes:', error);
    process.exit(1);
  }
};

importNotes();

