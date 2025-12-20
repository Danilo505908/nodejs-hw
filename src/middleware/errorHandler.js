import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    // Для HttpError використовуємо статус-код і повідомлення/назву помилки
    const status = err.status || err.statusCode;
    const message = err.message || err.name || 'Error';

    return res.status(status).json({
      message,
    });
  }

  // Логуємо помилку для дебагу
  console.error('Error details:');
  console.error('Message:', err.message);
  console.error('Stack:', err.stack);
  console.error('Full error:', err);

  // Для інших помилок повертаємо статус 500 і загальне повідомлення
  res.status(500).json({
    message: 'Internal server error',
  });
};

