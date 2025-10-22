const db = require("../db");


exports.saveUOM = (req, res) => {
    const { productName, size, body, sleeve, pocket, wastage, shrinkage } = req.body;

    // Convert to numbers in case frontend sends strings
    const bodyNum = parseFloat(body);
    const sleeveNum = parseFloat(sleeve);
    const pocketNum = parseFloat(pocket);
    const wastageNum = parseFloat(wastage);
    const shrinkageNum = parseFloat(shrinkage);

    // Recalculate baseFabric on backend
    const base = bodyNum + sleeveNum + pocketNum;
    const baseFabric = base + (base * ((wastageNum + shrinkageNum) / 100));

    const sql = `
        INSERT INTO uom 
        (productName, size, body, sleeve, pocket, wastage, shrinkage, baseFabric)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        productName, size, bodyNum, sleeveNum, pocketNum,
        wastageNum, shrinkageNum, baseFabric
    ], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'Database error', details: err });
        }

        res.send({ message: 'UOM Saved Successfully!', id: result.insertId });
    });
};


exports.getAllUOM = (req, res) => {
    const sql = 'select * from uom';
    db.query(sql, (err, result) => {
        if (err)
            return res.status(500).send(err);
        return res.send(result);
    });
};