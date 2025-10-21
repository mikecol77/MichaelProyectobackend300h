import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ ok: false, message: 'No autorizado' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.sub;
    req.userRole = payload.rol;
    next();
  } catch {
    return res.status(401).json({ ok: false, message: 'Token inválido o expirado' });
  }
};
