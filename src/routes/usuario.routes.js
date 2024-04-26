import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  login,
} from "../controllers/usuario.controllers.js";
import validacionUsuario from "../helpers/validacionUsuario.js";
import validacionLogin from "../helpers/validacionLogin.js"; // Importa el middleware de validación de inicio de sesión

const router = Router();

// Ruta para iniciar sesión
router.route("/login").post(validacionLogin, async (req, res) => {
  try {
    // Lógica para iniciar sesión
    await login(req, res);
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    res.status(500).send("Error del servidor");
  }
});

// Rutas para registro de usuarios y listar usuarios
router.route("/").get(listarUsuarios);
router.route("/nuevo").post(validacionUsuario, async (req, res) => {
  try {
    // Lógica para crear un nuevo usuario
    await crearUsuario(req, res);
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error.message);
    res.status(500).send("Error del servidor");
  }
});

export default router;
