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
