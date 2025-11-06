const db = require("../db");

exports.saveOrder = (req, res) => {
    const {

        orderDate,
        deliveryDate,

        shortSmallSize,
        shortSPrice,
        shortMediumSize,
        shortMPrice,
        shortLargeSize,
        shortLPrice,
        shortXLSize,
        shortXLPrice,


        fullSmallSize,
        fullSPrice,
        fullMediumSize,
        fullMPrice,
        fullLargeSize,
        fullLPrice,
        fullXLSize,
        fullXLPrice,

        vat,
        paidAmount,
        remarks,
        orderStatus,
        bomstyle,
        buyer,
    } = req.body;


    // Extract nested IDs correctly
    const bomStyle_id = bomstyle?.id || null;
    const buyer_id = buyer?.id || null;

    if (!bomStyle_id || !buyer_id) {
        return res.status(400).json({ message: 'Missing buyer_id or bomStyle_id' });
    }



    const subTotal = (shortSmallSize * shortSPrice) +
        (shortMediumSize * shortMPrice) +
        (shortLargeSize * shortLPrice) +
        (shortXLSize * shortXLPrice) +
        (fullSmallSize * fullSPrice) +
        (fullMediumSize * fullMPrice) +
        (fullLargeSize * fullLPrice) +
        (fullXLSize * fullXLPrice);




    const dueAmount = subTotal + (vat / 100) - paidAmount;
    const vatAmount = subTotal * (vat / 100);
    const total = subTotal + vatAmount;

    // Proper SQL query
    const sql = `
    INSERT INTO orders(
      orderDate, deliveryDate, shortSmallSize, shortSPrice, shortMediumSize, shortMPrice, shortLargeSize, shortLPrice,
      shortXLSize, shortXLPrice, fullSmallSize, fullSPrice, fullMediumSize, fullMPrice, fullLargeSize, fullLPrice,
      fullXLSize, fullXLPrice, subTotal, vat, paidAmount, dueAmount, total, remarks, orderStatus, bomStyle_id, buyer_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

    // Correct value order
    const values = [
        orderDate,
        deliveryDate,

        shortSmallSize,
        shortSPrice,
        shortMediumSize,
        shortMPrice,
        shortLargeSize,
        shortLPrice,
        shortXLSize,
        shortXLPrice,

        fullSmallSize,
        fullSPrice,
        fullMediumSize,
        fullMPrice,
        fullLargeSize,
        fullLPrice,
        fullXLSize,
        fullXLPrice,

        subTotal,
        vat,
        paidAmount,
        dueAmount,
        total,
        remarks,
        orderStatus,

        bomStyle_id,
        buyer_id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('SQL error:', err);
            return res.status(500).send(err);
        }
        res.send({ message: ' Order Created Successfully!', id: result.insertId });
    });
}

exports.getAllOrderList = (req, res) => {

    const sql = `
    SELECT 
    o.id,
    o.deliveryDate,
    bom.styleCode AS bomstyle,
    b.name AS buyers
    FROM orders o
    JOIN bomstyle bom ON o.bomStyle_id = bom.id
    JOIN buyers b ON o.buyer_id = b.id
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const formatted = result.map((row) => ({
            id: row.id,
            deliveryDate: row.deliveryDate,
            buyer: {
                id: row.buyer_id,
                name: row.buyers
            },
            bomStyle: {
                id: row.bomStyle_id,
                styleCode: row.bomstyle
            }

        }));
        res.json(formatted);
    });
};



exports.getOrderById = (req, res) => {
    const { id } = req.params;

    const sql = `
    SELECT 
      p.id,
      p.orderDate,
      p.deliveryDate,
      p.shortSmallSize,
      p.shortSPrice,
      p.shortMediumSize,
      p.shortMPrice,
      p.shortLargeSize,
      p.shortLPrice,
      p.shortXLSize,
      p.shortXLPrice,

      p.fullSmallSize,
      p.fullSPrice,
      p.fullMediumSize,
      p.fullMPrice,
      p.fullLargeSize,
      p.fullLPrice,
      p.fullXLSize,
      p.fullXLPrice,

      p.subTotal,
      p.vat,
      p.paidAmount,
      p.dueAmount,
      p.total,
      p.remarks,
      p.orderStatus,
      p.bomStyle_id,
      p.buyer_id,

     bom.styleCode AS styleCode,
     b.name AS name,
     b.address AS address

    FROM orders p
    JOIN bomstyle bom ON p.bomStyle_id = bom.id
    JOIN buyers b ON p.buyer_id = b.id
    WHERE p.id = ?
  `;

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0)
            return res.status(404).json({ message: "Order not found" });

        const row = result[0];

        // ✅ Transform flat SQL result into the same nested structure
        const formatted = {
            id: row.id,
            orderDate: row.orderDate,
            deliveryDate: row.deliveryDate,

            shortSmallSize: row.shortSmallSize,
            shortSPrice: row.shortSPrice,
            shortMediumSize: row.shortMediumSize,
            shortMPrice: row.shortMPrice,
            shortLargeSize: row.shortLargeSize,
            shortLPrice: row.shortLPrice,
            shortXLSize: row.shortXLSize,
            shortXLPrice: row.shortXLPrice,

            fullSmallSize: row.fullSmallSize,
            fullSPrice: row.fullSPrice,
            fullMediumSize: row.fullMediumSize,
            fullMPrice: row.fullMPrice,
            fullLargeSize: row.fullLargeSize,
            fullLPrice: row.fullLPrice,
            fullXLSize: row.fullXLSize,
            fullXLPrice: row.fullXLPrice,


            subTotal: row.subTotal,
            vat: row.vat,
            paidAmount: row.paidAmount,
            dueAmount: row.dueAmount,
            total: row.total,
            remarks: row.remarks,
            orderStatus: row.orderStatus,


            bomstyle: {
                id: row.bomStyle_id,
                styleCode: row.styleCode
            },
            buyer: {
                id: row.buyer_id,
                name: row.name,
                address: row.address,
            },
        };
        res.json(formatted);
    });
};