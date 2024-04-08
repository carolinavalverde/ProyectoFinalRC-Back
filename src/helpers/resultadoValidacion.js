import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next) => {
  const errors = validationResult(req);
  //quiero saber si fallo la validacion
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  //continuar con la ejecucion del siguiente codigo
  next();
};

export default resultadoValidacion;
