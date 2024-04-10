import { validationResult } from "express-validator";
import Producto from "../database/models/producto.js";

export const listarProductos = async(req, res) => {
  try {
   //pedir a la bd la lista de todos los productos
   const productos = await Producto.find()
   //responder al frontend con el array de productos
   res.status(200).json(productos)
  } catch (err) {
   console.error(err);
   res.status(400).json({mensaje:'Error al buscar los productos'})
  }
 };

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

export const borrarProducto = async (req, res) => {
  try {
      //verificar si el producto existe con el id correspondiente
      const productoBuscado = await Producto.findById(req.params.id);
      //si no existe contestar con un status 404
      if (!productoBuscado) {
          return res
          .status(404)
          .json({ mensaje: "El id enviado no corresponde a ningun producto" });
      }
      await Producto.findByIdAndDelete(req.params.id);
      res
          .status(200)
          .json({ mensaje: "El producto fue eliminado correctamente" });
      } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: "Error al borrar el producto" });
      }
  };
  
