const db = require("../db");

exports.saveBOM = (req, res) => {
    const { serial, material, unit, quantity, unit_price, uom, bomStyle } = req.body;


     // Extract nested IDs correctly
    const bomstyle_id = bomStyle?.id || null;
    const uom_id = uom?.id || null;

    if (!bomstyle_id || !uom_id) {
        return res.status(400).json({ message: 'Missing uom_id or bomstyle_id' });
    }




    const quantityNum = parseFloat(quantity);
    const unitPriceNum = parseFloat(unit_price);


    const total_cost = quantityNum * unitPriceNum;

    const sql = 'insert into bom(serial, material, unit, quantity, unit_price, total_cost, uom_id, bomstyle_id) values (?,?,?,?,?,?,?,?)'

    db.query(sql, [serial, material, unit, quantityNum, unitPriceNum, total_cost, uom_id, bomstyle_id], (err, result) => {
        if (err)
            return res.status(500).send(err);
        res.send({ message: 'BOM Saved Succesfully !', id: result.insertId });
    });

};
// controllers/bomController.js

exports.getBOMByStyleCode = (req, res) => {
    const { styleCode } = req.params;
    console.log("🔍 Received styleCode:", styleCode);

    const sql = `
    SELECT 
      p.material,
      p.unit,
      p.quantity,
      p.unit_price,
      p.total_cost,
      p.serial,
      p.bomStyle_id,
      p.uom_id,
      b.styleCode AS styleCode,
      b.description AS description,
      u.baseFabric AS baseFabric
    FROM bom p
    JOIN bomstyle b ON p.bomStyle_id = b.id
    JOIN uom u ON p.uom_id = u.id
    WHERE b.styleCode = ?
  `;

    db.query(sql, [styleCode], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0)
            return res.status(404).json({ message: "BOM not found" });

        const formatted = result.map(row => ({
            material: row.material,
            unit: row.unit,
            quantity: row.quantity,
            unit_price: row.unit_price,
            total_cost: row.total_cost,
            serial: row.serial,
            bomstyle: {
                id: row.bomStyle_id,
                styleCode: row.styleCode,
                description: row.description
            },
            uom: {
                id: row.uom_id,
                baseFabric: row.baseFabric
            }
        }));

        res.json(formatted);
    });
};


