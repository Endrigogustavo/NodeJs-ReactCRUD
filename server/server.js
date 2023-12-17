import  express  from "express";
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'crud'
})

app.get('/' , (req,res)=> {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, result)=>{
        if(err)return res.json({Message: "Erro no servidor"});
        return res.json(result);
    })
})



app.post('/create', (req, res) =>{
    const sql = "INSERT INTO student (`Name`,`Email`) VALUES (?)"
    const values = [
        req.body.Name,
        req.body.Email,
    ]
    db.query(sql, [values], (err, data) =>{
        if(err) return res.json(err);
        return res.json("Created")
    })
})


app.put('/update/:ID', (req, res) =>{
    const sql = "UPDATE student set `Name` = ?, `Email` = ? WHERE ID = ?"
    const Id = req.params.ID;
    const values = [
        req.body.Name,
        req.body.Email,
    ]
    db.query(sql, [...values, Id], (err, data) =>{
        if(err) return res.json(err);
        return res.json("Upadeted")
    })
})


app.delete('/delete/:ID', (req, res) =>{
    const sql = "DELETE FROM student WHERE ID = ?"
    const Id = req.params.ID;

    db.query(sql, [Id], (err, data) =>{
        if(err) return res.json(err);
        return res.json("Deleted")
    })
})

app.listen(8081, ()=> {
    console.log("Sucesso");
})