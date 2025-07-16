const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('gatos.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS gatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    descripcion TEXT,
    imagen_url TEXT
  )`);
});

module.exports = db;