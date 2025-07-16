const express = require('express');
const db = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Mostrar todos los gatos
app.get('/', (req, res) => {
  db.all("SELECT * FROM gatos", (err, rows) => {
    res.render('index', { gatos: rows });
  });
});

// Mostrar formulario para editar
app.get('/editar/:id', (req, res) => {
  db.get("SELECT * FROM gatos WHERE id = ?", [req.params.id], (err, row) => {
    res.render('editar', { gato: row });
  });
});

// Actualizar registro
app.post('/editar/:id', (req, res) => {
  const { nombre, descripcion, imagen_url } = req.body;
  db.run("UPDATE gatos SET nombre = ?, descripcion = ?, imagen_url = ? WHERE id = ?",
    [nombre, descripcion, imagen_url, req.params.id],
    () => res.redirect('/'));
});

// Eliminar registro
app.get('/eliminar/:id', (req, res) => {
  db.run("DELETE FROM gatos WHERE id = ?", [req.params.id], () => {
    res.redirect('/');
  });
});

// Agregar nuevo registro
app.post('/agregar', (req, res) => {
  const { nombre, descripcion, imagen_url } = req.body;
  db.run("INSERT INTO gatos(nombre, descripcion, imagen_url) VALUES (?, ?, ?)", 
    [nombre, descripcion, imagen_url], () => {
      res.redirect('/');
    });
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});