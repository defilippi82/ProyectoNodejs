const express = require('express')
const router = express.Router()

router.get("/admin/usuarios/:id", (req, res) => {
    res.send("Muestra la info y de la DB")
});

router.put("/admin/usuarios/:id", (req, res) => {
    res.send("Actualiza desde un form la info y enviarla a DB")
});
router.post("/admin/usuarios", (req, res) => {
    res.send("Crea desde un form la info y enviarla a DB")
});

router.delete("/admin/usuarios", (req, res) => {
    res.send("Borra desde un form la info y enviarla a DB")
});