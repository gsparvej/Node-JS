const db = require("../db");


// save
exports.saveVendor = (req, res) => {
    const{ address, contact_person, vat, comapny_name, email, phone} = req.body;
  
    const sql = 'insert into vendors(address, contact_person, vat, comapny_name, email, phone) values(?,?,?,?,?,?)';

    db.query(sql, [address, contact_person, vat, comapny_name, email, phone], (err, result) =>{
        if(err) 
            return res.status(500).send(err);
        res.send({message: 'Vendor Added Succesfully!', id: result.insertId});
    });
};



// get
exports.getAllVendors = (req,res)=> {
    const sql = 'SELECT * FROM vendors';
    db.query(sql, (err, result)=> {
        if(err)
            return res.status(500).send(err);
        res.send(result);
    });
};


exports.getVendorById = (req, res) => {
     const id = req.params.id;
    const sql = "SELECT * FROM vendors WHERE id =?";
    db.query(sql, [id], (err, result) => {
        if(err)
            return res.status(500).send(err);
        res.send(result[0]);
    });
};