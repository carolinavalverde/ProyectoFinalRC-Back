import { validationResult } from "express-validator";
import Producto from "../database/models/producto.js";


export const editarProducto = async(req, res) => {
    try {
      // verificar si el producto existe con el id correspondiente
      const productoBuscado = await Producto.findById(req.params.id)
      // si no existe, contestar con un status 404
      if (!productoBuscado) {
        return res.status(404).json({ mensaje: 'El id enviado no corresponde a ningun producto' })
      } 

      