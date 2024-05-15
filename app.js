const express = require("express");
const app = express();

const { agregarUsuario, mostrarTodosLosUsuarios, editarUsuario, borrarUsuario, transferencia, mostrarTransferencias, borrarTransferencia } = require("./consulta"); 

app.listen(3000, console.log("Servidor en linea"))

app.use(express.json())//middleware
app.use(express.static('public'));

app.post("/usuario", async (req, res) =>{
    try {
        const data = req.body;
        const result = await agregarUsuario(data);
        res.send(result)
    } catch (error) {
        res.status(500).send("Algo salio mal 😢...")
    }
});

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await mostrarTodosLosUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.put("/usuario/:id", async (req, res) => {    
    try {
        const { id } = req.params;
        const data = Object.values(req.body);
        const respuesta = await editarUsuario(id, data);
        res.json(respuesta);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.delete("/usuario", async (req, res) => {
    try {
        const { id } = req.query;
        const respuesta = await borrarUsuario(id);
        res.json(respuesta);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.post("/transferencia", async (req, res) => {
    try {
        const data = req.body;
        const valor = await transferencia(data);
        res.json(valor);
    } catch (error) {
        console.error('Error al realizar transferencia:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get("/transferencias", async (req, res) => {
    try {
        const transferencias = await mostrarTransferencias();
        res.json(transferencias);
    } catch (error) {
        console.error('Error al obtener transferencias:', error);
        res.status(500).send('Error interno del servidor');
    }
});


