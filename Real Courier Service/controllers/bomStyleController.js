const db = require("../db");


exports.saveBomstyle = (req, res) => {
    const { styleCode, styleType, description } = req.body;
    const sql = "insert into bomstyle (styleCode, styleType, description) values(?,?,?)";

    db.query(sql, [styleCode, styleType, description], (err, result) => {
        if (err)
            return res.status(500).send(err);
        res.send({ message: 'BomStyle Saved Succesfully !', id: result.insertId });
    });
};

exports.getAllBomStyle = (req, res) => {
    const sql = 'select * from bomstyle';
    db.query(sql, (err, result) => {
        if (err)
            return res.status(500).send(err);
        return res.send(result);
    });
};

