const db = require("../db");



exports.createPurchaseOrder = (req, res)=>{
     const{ po_number, quantity, rate, total, item_id, vendor_id} = req.body;
  
    const sql = 'insert into po(po_number, quantity, rate, total, item_id, vendor_id) values(?,?,?,?,?,?)';
    db.query(sql, [po_number, quantity, rate, total, item_id, vendor_id], (err, result) => {
         if(err) 
            return res.status(500).send(err);
        res.send({message: 'Purchase Order Created Succesfully!', id: result.insertId});
    });
};

exports.getAllPurchaseOrder = (req, res) => {
  const sql = `
    SELECT 
      p.id,
      p.po_number,
      p.quantity,
      p.rate,
      p.total,
      p.item_id,
      p.vendor_id,
      i.category_name AS items,
      v.comapny_name AS vendors
    FROM po p
    JOIN items i ON p.item_id = i.id
    JOIN vendors v ON p.vendor_id = v.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    // ✅ Transform flat rows into nested objects
    const formatted = result.map((row) => ({
      id: row.id,
      po_number: row.po_number,
      quantity: row.quantity,
      rate: row.rate,
      total: row.total,
      item: {
        id: row.item_id,
        category_name: row.items
      },
      vendor: {
        id: row.vendor_id,
        comapny_name: row.vendors
      }
    }));

    res.json(formatted);
  });
};

exports.getPOById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      p.id,
      p.po_number,
      p.quantity,
      p.rate,
      p.total,
      p.item_id,
      p.vendor_id,
      i.category_name AS items,
      i.unit AS unit,
      v.comapny_name AS vendors,
      v.contact_person AS contact_person,
      v.phone AS phone,
      v.address AS address
    FROM po p
    JOIN items i ON p.item_id = i.id
    JOIN vendors v ON p.vendor_id = v.id
    WHERE p.id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Purchase Order not found" });

    const row = result[0];

    // ✅ Transform flat SQL result into the same nested structure
    const formatted = {
      id: row.id,
      po_number: row.po_number,
      quantity: row.quantity,
      rate: row.rate,
      total: row.total,
      item: {
        id: row.item_id,
        category_name: row.items,
        unit: row.unit,
      },
      vendor: {
        id: row.vendor_id,
        comapny_name: row.vendors,
        contact_person: row.contact_person,
        phone: row.phone,
        address: row.address,
      },
    };

    res.json(formatted);
  });
};

