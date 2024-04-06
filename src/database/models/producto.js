import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  
//aqui creamos un modelo
const Producto = mongoose.model('producto', productoSchema); //ponerlo siempre en singular xq adiciona una s para crear la coleccion

export default Producto;