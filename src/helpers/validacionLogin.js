import { check } from "express-validator";

const validacionLogin = [
  check("email")
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("El correo electrónico no es válido"),
  check("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

export default validacionLogin;
