import { validationResult } from "express-validator";
import Producto from "../database/models/producto.js";

export const obtenerProducto = async (req, res) => {
  try {
    console.log(req.params.id);
    const productoBuscado = await Producto.findById(req.params.id);
    if (!productoBuscado) {
      return res
        .status(404)
        .json({ mensaje: "El id enviado no corresponde a ningun producto" });
    }
    res.status(200).json(productoBuscado);
  } catch (err) {
    console.error(err);
    res.status(400).json({ mensaje: "Error al obtener el producto" });
  }
};

export const editarProducto = async (req, res) => {
  try {
    const productoBuscado = await Producto.findById(req.params.id);
    if (!productoBuscado) {
      return res
        .status(404)
        .json({ mensaje: "El id enviado no corresponde a ningun producto" });
    }
    await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ mensaje: "El producto fue editado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al editar el producto" });
  }
};
