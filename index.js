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

app.use(
  cors({
    origin: "https://prueba-restaurant.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options(
  "*",
  cors({
    origin: "https://prueba-restaurant.netlify.app",
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

app.use(
  express.static(path.join(__dirname, "/public"), (req, res, next) => {
    console.log(
      "Archivos estáticos servidos desde: ",
      path.join(__dirname, "/public")
    );
    next();
  })
);

app.use("/api", productosRouter);
app.use("/api/usuario", usuarioRouter);
