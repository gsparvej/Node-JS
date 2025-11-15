const db = require("../db");

exports.stockIn = (req, res) => {
    const {
        quantity,
        items
    } = req.body;
    const item_id = items?.id || null;


    if (!item_id) {
        return res.status(400).json({ message: 'Missing item_id ' });
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be a positive number." });
    }

    const sql = `
    INSERT INTO stock_in(
      quantity, item_id, receivedDate
    )
    VALUES (?, ?, NOW())
  `;
    const values = [
        quantity,
        item_id
    ];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('SQL error:', err);
            return res.status(500).send(err);
        }

        const sqlCheck = `Select quantity from inventories where item_id = ?`;
        db.query(sqlCheck, [item_id], (err2, rows) => {
            
        })
        res.send({ message: 'Stock In Successfully!', id: result.insertId });
    });
}

exports.getInventories = (req,res) => {
     const {
        quantity,
        items
    } = req.body;
    const item_id = items?.id || null;


    if (!item_id) {
        return res.status(400).json({ message: 'Missing item_id ' });
    }
}