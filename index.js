const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "LaoGundamShop"
})

app.get('/test', (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    });
        
})

app.post('/create', (req, res) => {
    const name = req.body.name;

    db.query("INSERT INTO product (name) VALUES (?)", name, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.put("/update", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    db.query("UPDATE product SET name = ? where id = ?", [name, id], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE from product where id = ?", id, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/test/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM product where id = ?", id, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result)
        }
    });
        
})



app.listen('3001', () => {
    console.log('Server is running on port 3001');
})