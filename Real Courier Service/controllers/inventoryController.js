const db = require("../db");




exports.stockIn = (req, res) => {
    const { quantity, items } = req.body;
    const item_id = items?.id || null;

    if (!item_id) {
        return res.status(400).json({ message: 'Missing item_id' });
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be a positive number." });
    }

    const sql = `
        INSERT INTO stock_in (quantity, item_id, receivedDate)
        VALUES (?, ?, NOW())
    `;

    db.query(sql, [quantity, item_id], (err, result) => {
        if (err) return res.status(500).send(err);

        const sqlCheck = `SELECT quantity FROM inventories WHERE item_id = ?`;

        db.query(sqlCheck, [item_id], (err2, rows) => {
            if (err2) return res.status(500).send(err2);

            if (rows.length > 0) {
                const sqlUpdate = `
                    UPDATE inventories 
                    SET quantity = quantity + ?
                    WHERE item_id = ?
                `;
                db.query(sqlUpdate, [quantity, item_id]);
            }
            else {
                const sqlCreate = `
                    INSERT INTO inventories (item_id, quantity)
                    VALUES (?, ?)
                `;
                db.query(sqlCreate, [item_id, quantity]);  // <-- correct order
            }

            return res.json({
                message: "Stock In Successfully!",
                id: result.insertId
            });
        });
    });
};


exports.getInventories = (req, res) => {
    const {
        quantity,
        items
    } = req.body;
    const item_id = items?.id || null;


    if (!item_id) {
        return res.status(400).json({ message: 'Missing item_id ' });
    }
}