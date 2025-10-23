const db = require("../db");



exports.getAllDepartment = (req, res) => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.createDepartment = (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO department (name) VALUES (?)", [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name });
  });
};