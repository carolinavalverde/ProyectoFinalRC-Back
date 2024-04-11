import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
    check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es un dato obligatorio")
        .isLength({ min: 4, max: 50 })
        .withMessage("El nombre del producto debe tener entre 4 y 50 caracteres"),
    check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage("El precio debe ser un número")
        .custom((value) => {
            if (value >= 100 && value <= 10000) {
                return true;
            } else {
                throw new Error("El precio debe estar entre $100 y $10000");
            }
        }),
    check("categoria")
        .notEmpty()
        .withMessage("La categoría es un dato obligatorio")
        .isIn(["Entradas", "Platillos", "Bebidas", "Postres"])
        .withMessage("La categoría debe ser Infusiones, Batidos, Dulce o Salado"),
    check("imagen")
        .notEmpty()
        .withMessage("La imagen es un dato obligatorio")
        .matches(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/)
        .withMessage(
            "La imagen debe ser una URL válida con formato JPG, JPEG, GIF o PNG"
        ),
    (req, res, next) => resultadoValidacion(req, res, next),
    check("descripcion_breve")
        .notEmpty()
        .withMessage("La descripción breve es un dato obligatorio")
        .isLength({ min: 10, max: 50 })
        .withMessage("La descripción breve debe tener entre 10 y 50 caracteres"),
    check("descripcion_amplia")
        .notEmpty()
        .withMessage("La descripción amplia es un dato obligatorio")
        .isLength({ min: 30, max: 300 })
        .withMessage("La descripción amplia debe tener entre 30 y 300 caracteres"),
];

export default validacionProducto;
