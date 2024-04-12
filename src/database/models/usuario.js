import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
  nombreUsuario: {
    type: String,
    minLength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    maxlength: 200,
    unique: true,
    required: true,
    validate: {
      validator: (value) => {
        const pattern =
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return pattern.test(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model("usuario", usuarioSchema);

export default Usuario;
