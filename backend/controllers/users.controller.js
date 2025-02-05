import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Hashear la contraseña
const hashPassword = (password) => bcrypt.hashSync(password, 10);

// 📌 Registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    // Verificar datos obligatorios
    if (!first_name || !last_name || !email || !age || !password || !role) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crear usuario y guardar en la BD
    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword(password),
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// 📌 Login de usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "El email y la contraseña son obligatorios" });
    }

    // Buscar usuario en la BD
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        age: user.age,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Enviar cookie con token
    res.cookie("token", token, { httpOnly: true }).json({
      message: "Login exitoso",
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        age: user.age,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// 📌 Obtener usuario autenticado desde la cookie
export const getCurrentUser = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No autenticado" });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = {
      id: decoded.id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      age: decoded.age,
      role: decoded.role,
    };

    res.json({ message: "Usuario autenticado", user });
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
