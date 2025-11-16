const db = require("../db");



exports.addProductionOrder = (req, res) => {

    const { description, startDate, endDate, planQty, priority, size, status, bomstyle, orders } = req.body;
    const bomstyle_id = bomstyle?.id || null;
    const order_id = orders?.id || null;

    if (!bomstyle_id || !order_id) {
        return res.status(400).json({ message: 'missing bomstyle_id or order_id' });
    }
    if (!planQty || isNaN(planQty) || planQty <= 0) {
        return res.status(400).json({ message: ' Please Enter the Plan Quantity in Possitive number' });
    }

    const sql = `
    insert into production_orders (description, startDate, endDate, planQty,priority, size,status, bomstyle_id, order_id)
    values(?,?,?,?,?,?,?,?,?)
    `;

    db.query(sql, [description, startDate, endDate, planQty, priority, size, status, bomstyle_id, order_id], (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).send(err);
        }
        res.send({ message: 'Production Order Create Successfully! ', id: result.insertId });
    });
}

exports.getAllProductionOrder = (req, res) => {
    const sql = `
    select 
    p.id,
    p.description,
    p.startDate,
    p.endDate,
    p.planQty,
    p.priority,
    p.size,
    p.status,
    bom.styleCode AS styleCode,
    o.id AS order_id
    FROM production_orders p
    JOIN bomstyle bom ON p.bomstyle_id = bom.id
    JOIN orders o ON p.order_id = o.id
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const formatted = result.map((row) => ({
            id: row.id,
            description: row.description,
            startDate: row.startDate,
            endDate: row.endDate,
            planQty: row.planQty,
            priority: row.priority,
            size: row.size,
            status: row.status,
            orders: {
                id: row.order_id
            },
            bomstyle: {
                id: row.bomStyle_id,
                styleCode: row.styleCode
            }
        }));
        res.json({ formatted });
    });
}