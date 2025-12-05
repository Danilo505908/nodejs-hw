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

  // Для інших помилок повертаємо статус 500 і загальне повідомлення
  res.status(500).json({
    message: 'Internal server error',
  });
};

