import { check } from "express-validator";

const validacionUsuario = [
  check("nombreApellido")
    .notEmpty()
    .withMessage("El nombre y apellido son obligatorios")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre y apellido deben tener entre 2 y 50 caracteres"),
  check("direccion")
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .isLength({ min: 5, max: 100 })
    .withMessage("La dirección debe tener entre 5 y 100 caracteres"),
  check("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("El correo electrónico no es válido"),
  check("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/)
    .withMessage(
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"
    ),
];

export default validacionUsuario;
