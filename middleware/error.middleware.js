const errorMiddleware = (error, _req, res, _next) => {
  const status = error.status || 500;
  res.status(status).json({ message: error.message });
};

module.exports = errorMiddleware;
