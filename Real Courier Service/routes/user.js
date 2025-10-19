const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/save', (req, res) => {
    const{ name, email, password , phone } = req.body;
    const activeStatus_value = true;
    const userRole = 'CONSUMER';

    const sql = 'insert into users(name, email, password , phone , role, activeStatus) values(?,?,?,?,?,?)';

    db.query(sql, [name, email, password , phone, userRole, activeStatus_value], (err, result) =>{
        if(err) 
            return res.status(500).send(err);
        res.send({message: 'User Added Succesfully!', id: result.insertId});
    });
});



// read
router.get('/all', (req,res)=> {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result)=> {
        if(err)
            return res.status(500).send(err);
        res.send(result);
    });
});

// update
router.put('/update/:id', (req, res) => {
    const { name, email, password, phone } = req.body;
    const activeStatus_value = true;
    const userRole = 'CONSUMER';
    const { id } = req.params;

    const sql = 'UPDATE users SET name = ?, email = ?, password = ?, phone = ?, role = ?, activeStatus = ? WHERE id = ?';

    db.query(sql, [name, email, password, phone, userRole, activeStatus_value, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'User updated successfully!' });
    });
});


// delete
router.delete('/delete/:id', (req,res) => {
    const {id} = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql,[id] ,(err, result) => {
        if(err)
            return res.status(500).send(err);
        res.send({message: 'User Deleted Successfully!'});
    });
});





module.exports = router;