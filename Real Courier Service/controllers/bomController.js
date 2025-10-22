const db = require("../db");

exports.saveBOM = (req, res) => {
    const { serial, material, unit, quantity, unit_price, uom_id, bomstyle_id } = req.body;

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

