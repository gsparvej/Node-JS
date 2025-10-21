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

exports.getAllPurchaseOrder = (req, res) =>{
    db.query(
        `SELECT p.* , i.category_name AS items, v.comapny_name AS vendors
        FROM po p
        JOIN items i ON p.item_id = i.id
        JOIN vendors v ON p.vendor_id = v.id`,
        (err , result) => {
            if(err)
                return res.status(500).json({error: err.message});
            res.json(result);
        }
    );
};