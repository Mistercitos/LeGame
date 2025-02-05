import express from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/users.controller.js";
import { auth, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser); // Registrar usuario
router.post("/login", loginUser); // Iniciar sesión
router.get("/current", auth, getCurrentUser); // Obtener usuario autenticado (protegido)
router.get("/admin", auth, checkRole("admin"), (req, res) => {
  // Ruta solo para admins
  res.json({ message: "Bienvenido, administrador" });
});

export default router;
