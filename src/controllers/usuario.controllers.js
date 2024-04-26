import Usuario from "../database/models/usuario.js";
import bcrypt from "bcrypt";
import generarJWT from "../helpers/generarJWT.js";

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const usuarioBuscado = await Usuario.findOne({ email });

    if (!usuarioBuscado) {
      return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    const passValido = bcrypt.compareSync(password, usuarioBuscado.password);

    if (!passValido) {
      return res
        .status(400)
        .json({ mensaje: "Correo o contraseña incorrectos" });
    }

    const token = await generarJWT(usuarioBuscado._id, usuarioBuscado.email);

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
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

    if (usuario) {
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }

    usuario = new Usuario(req.body);

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
