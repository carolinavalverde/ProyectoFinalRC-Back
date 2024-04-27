import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

export const validacionUsuario = [
  check("nombreApellido")
    .notEmpty()
    .withMessage("El nombre y apellido son obligatorios")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre y apellido debe tener entre 2 y 30 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("El correo electrónico no es válido"),
  check("contraseña")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{}|;:,.<>?]).*$/
    )
    .withMessage(
      "La contraseña debe contener al menos un dígito, una letra minúscula, una letra mayúscula y un carácter especial"
    ),
  check("rol").notEmpty().withMessage("El rol es obligatorio"),
 
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionUsuario;
