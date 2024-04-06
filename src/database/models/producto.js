import mongoose, { Schema } from "mongoose";

const productoSchema = new Schema({
  nombreProducto: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
    unique: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 100, //prueba para ver si funciona con valor negativo, si no lo ponemos si dejaria
    max: 10000,
  },
  imagen: {
    type: String,
    requiered: true,
    validate: {
      validator: (dato) => {
        const pattern = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/;
        return pattern.test(dato);
      },
    },
  },
  categoria: {
    type: String,
    required: true,
    enum:['Infusiones', 'Batidos', 'Dulce', 'Salado']
  },
  descripcion_breve: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 50,
  },
  descripcion_amplia: {
    type: String,
    required: true,
    minLength: 30,
    maxLength: 300,
  },
});
//aqui creamos un modelo
const Producto = mongoose.model('producto', productoSchema); //ponerlo siempre en singular xq adiciona una s para crear la coleccion

export default Producto;