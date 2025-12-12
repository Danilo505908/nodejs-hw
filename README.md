# Node.js Notes API

Express.js REST API для роботи з нотатками з використанням MongoDB та Mongoose.

## 🚀 Технології

- Node.js
- Express.js
- MongoDB (Mongoose)
- pino-http (логуювання)
- http-errors (обробка помилок)

## 📁 Структура проєкту

```
nodejs-hw/
├── src/
│   ├── controllers/      # Контролери для обробки запитів
│   │   └── notesController.js
│   ├── db/              # Підключення до бази даних
│   │   └── connectMongoDB.js
│   ├── middleware/      # Middleware
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── notFoundHandler.js
│   ├── models/          # Mongoose моделі
│   │   └── note.js
│   ├── routes/          # Маршрути
│   │   └── notesRoutes.js
│   ├── scripts/         # Допоміжні скрипти
│   │   └── importNotes.js
│   └── server.js        # Головний файл сервера
├── notes.json           # Тестові дані для імпорту
├── .env                 # Змінні оточення (не в Git)
└── package.json
```

## 🔧 Встановлення

1. Клонувати репозиторій
2. Встановити залежності:
   ```bash
   npm install
   ```
3. Створити файл `.env`:
   ```env
   PORT=3000
   MONGO_URL=your_mongodb_connection_string
   ```
4. Імпортувати тестові дані (опціонально):
   ```bash
   npm run import
   ```

## 🚀 Запуск

```bash
# Розробка
npm run dev

# Продакшн
npm start
```

## 📡 API Endpoints

### GET /notes
Отримати всі нотатки

### GET /notes/:noteId
Отримати нотатку за ID

### POST /notes
Створити нову нотатку
```json
{
  "title": "Note title",
  "content": "Note content",
  "tag": "Work"
}
```

### PATCH /notes/:noteId
Оновити нотатку

### DELETE /notes/:noteId
Видалити нотатку

## 📝 Модель Note

- `title` (String, required) - заголовок нотатки
- `content` (String, default: '') - вміст нотатки
- `tag` (String, enum, default: 'Todo') - тег нотатки
- `createdAt` (Date) - дата створення
- `updatedAt` (Date) - дата оновлення

### Доступні теги:
Work, Personal, Meeting, Shopping, Ideas, Travel, Finance, Health, Important, Todo





