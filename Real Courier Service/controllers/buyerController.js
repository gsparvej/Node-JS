const db = require("../db");


//save
exports.saveBuyer = (req, res) => {
    const { name, country, contactPerson, phone, email, address, website } = req.body;
    const sql = 'insert into buyers(name, country, contactPerson, phone, email, address, website) values(?,?,?,?,?,?,?)';

    db.query(sql, [name, country, contactPerson, phone, email, address, website], (err, result) => {
        if (err)
            return res.status(500).send(err);
        res.send({ message: 'Buyer Saved Successfully!', id: result.insertId });
    });
};

// get
exports.getAllBuyer = (req, res) => {
    const sql = 'select * from buyers';
    db.query(sql, (err, result) => {
        if (err)
            return res.status(500).send(err);
        res.send(result);
    });
};

exports.getBuyerById = (req, res) => {

    const id = req.params.id;
    const sql = 'select * from buyers where id=?';
    db.query(sql, [id], (err, result) => {
        if (err)
            return res.status(500).send(err);
        res.send(result[0]);
    });
};

