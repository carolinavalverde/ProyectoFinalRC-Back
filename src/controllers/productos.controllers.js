import { validationResult } from "express-validator";
import Producto from "../database/models/producto.js";


export const obtenerProducto = async(req, res) => {
    try {
     //verificar si el producto existe con el id correspondiente
     console.log(req.params.id)
     const productoBuscado = await Producto.findById(req.params.id)
     //si no existe contestar con un status 404
     if(!productoBuscado){
       return res.status(404).json({mensaje: 'El id enviado no corresponde a ningun producto'})
     }
     // si existe el producto enviarlo al frontend, status 200
     res.status(200).json(productoBuscado);
     
    } catch (err) {
     console.error(err);
     res.status(400).json({mensaje:'Error al obtener el producto'})
    }
   };
  


export const editarProducto = async(req, res) => {
    try {
      // verificar si el producto existe con el id correspondiente
      const productoBuscado = await Producto.findById(req.params.id)
      // si no existe, contestar con un status 404
      if (!productoBuscado) {
        return res.status(404).json({ mensaje: 'El id enviado no corresponde a ningun producto' })
      }
      // modificar el producto y enviar la respuesta 400
      await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true }) // Agregar { new: true } para devolver el producto actualizado
      res.status(200).json({ mensaje: 'El producto fue editado correctamente' })
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensaje: 'Error al editar el producto' })
    }
  };