import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import productosRouter from "./src/routes/productos.routes.js";
import usuarioRouter from "./src/routes/usuario.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import "./src/database/database.js";

const app = express();

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("Estoy en el puerto " + app.get("port"));
});

// Configurar CORS con opciones específicas
app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir peticiones de cualquier origen, pero solo si provienen de localhost o de la URL de producción
      if (
        !origin ||
        origin === "http://localhost:5173" ||
        origin === "https://prueba-restaurant.netlify.app"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api", productosRouter);
app.use("/api/usuario", usuarioRouter);
