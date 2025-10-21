export const notFoundHandler = (req, res) => {
  res.status(404).json({ ok: false, message: `No se encontró ${req.originalUrl}` });
};

export const errorHandler = (err, _req, res, _next) => {
  console.error('[Error]', err);
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    message: err.message || 'Error interno del servidor'
  });
};
