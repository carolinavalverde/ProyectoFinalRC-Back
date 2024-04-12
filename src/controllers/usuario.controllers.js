import Usuario from "../database/models/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const login = async (req, res) => {
  try {
    //tomar el email y password
    const { email, password } = req.body;
    //verificar el email, si existe continuo con la siguiente instruccion, si no existe el mail responder con un error. status 400
    const usuarioBuscado = await Usuario.findOne({ email });
    if (!usuarioBuscado) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password incorrecto - correo" });
    }
    //verificar la contraseña
    const passValido = bcrypt.compareSync(password, usuarioBuscado.password);
    //si esta mal la contraseña responder un status 400
    if (!passValido) {
      return res
        .status(400)
        .json({ mensaje: "Correo o password incorrecto - password" });
    }
    //generar token
    const token = await generarJWT(usuarioBuscado._id, usuarioBuscado.email);
    //caso contrario responder con un mensaje de exito status 200
    res.status(200).json({
      mensaje: "El usuario existe",
      email: usuarioBuscado.email,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrió un error durante el inicio de sesión",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { email } = req.body;
    let usuario = await Usuario.findOne({ email });
    //si existe un usuario con el email enviado
    if (usuario) {
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }
    //aqui creo el usuario en la BD
    usuario = new Usuario(req.body);
    //encriptar el password
    //hashear la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(usuario.password, salt);
    await usuario.save();

    res.status(201).json({
      mensaje: "usuario creado",
      email: usuario.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "El usuario no pudo ser creado",
    });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      mensaje: "Error al buscar los usuarios",
    });
  }
};
