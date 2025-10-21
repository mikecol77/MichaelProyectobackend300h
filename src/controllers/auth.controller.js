import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiResponse } from '../utils/ApiResponse.js';

function signToken(user) {
  const payload = { sub: user._id, rol: user.rol };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
}

export const register = async (req, res, next) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json(ApiResponse.fail('El correo ya está registrado'));

    const user = await User.create({ nombre, email, password, rol });
    const token = signToken(user);
    res.status(201).json(ApiResponse.ok({ token, user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol } }, 'Usuario creado'));
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json(ApiResponse.fail('Credenciales inválidas'));

    const valid = await user.comparePassword(password);
    if (!valid) return res.status(401).json(ApiResponse.fail('Credenciales inválidas'));

    const token = signToken(user);
    res.json(ApiResponse.ok({ token, user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol } }, 'Login exitoso'));
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(ApiResponse.ok(user));
  } catch (err) {
    next(err);
  }
};
