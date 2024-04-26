import Usuario from "../database/model/usuario.js";
import bcrypt from "bcrypt";

export const crearUsuario = async (req, res) => {
  try {
    const { email } = req.body;
    let usuario = await Usuario.findOne({ email: email });
    if (usuario) {
      return res.status(400).json({
        mensaje: "Ese usuario ya esta registrado",
      });
    }
    usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync(10);
    usuario.contraseña = bcrypt.hashSync(usuario.contraseña, salt);
    await usuario.save();

    res.status(201).json({
      mensaje: "Usuario creado.",
      email: usuario.email,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "El usuario no pudo ser creado",
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuarioBuscado = await Usuario.findOne({ email });
    if (!usuarioBuscado) {
      return res.status(400).json({
        mensaje: "Correo o password incorrecto",
      });
    }
    const passwordValido = bcrypt.compareSync(
      contraseña,
      usuarioBuscado.contraseña
    );
    if (!passwordValido) {
      return res.status(400).json({
        mensaje: "Correo o password incorrecto",
      });
    }
    res
      .status(200)
      .json({
        mensaje: "El usuario existe",
        email: usuarioBuscado.email,
        usuario: usuarioBuscado.nombreUsuario,
        rol: usuarioBuscado.rol,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrió un error durante el inicio de sesión",
    });
  }
};
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json({
      usuarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Ocurrió un error durante la devolucion",
    });
  }
};
