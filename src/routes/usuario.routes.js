import { Router } from "express";
import { crearUsuario, listarUsuarios, login } from "../controllers/usuario.controllers.js";
import validacionUsuario from "../helpers/validacionUsuario.js";

const router = Router();

router.route('/').post(login)
router.post('/nuevo', validacionUsuario, crearUsuario);
router.route('/').get(listarUsuarios)

export default router;
