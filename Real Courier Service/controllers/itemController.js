const db = require("../db");



exports.saveItem = (req, res) => {
    const{ category_name, unit} = req.body;
  
    const sql = 'insert into items(category_name, unit) values(?,?)';

    db.query(sql, [category_name, unit], (err, result) =>{
        if(err) 
            return res.status(500).send(err);
        res.send({message: 'Item Added Succesfully!', id: result.insertId});
    });
};



// read
exports.getAllItems = (req,res)=> {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, result)=> {
        if(err)
            return res.status(500).send(err);
        res.send(result);
    });
};


exports.getItemById = (req, res) => {
     const id = req.params.id;
    const sql = "SELECT * FROM items WHERE id =?";
    db.query(sql, [id], (err, result) => {
        if(err)
            return res.status(500).send(err);
        res.send(result[0]);
    });
};
