import { Router } from "express";
import { crearUsuario, listarUsuarios, login } from "../controllers/usuario.controllers.js";
import validacionUsuario from "../helpers/validacionUsuario.js";

const router = Router();

router.route('/').post(login).get(listarUsuarios);
router.route('/nuevo').post([validacionUsuario], crearUsuario);


export default router;