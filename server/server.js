import  express  from "express";
import mysql from 'mysql';
import cors from 'cors';

//importando dados das bibliotecas
const app = express();
app.use(cors());

//pegando o banco e transformando em um json
app.use(express.json())

//conectando no banco
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'crud'
})

//Home com o metodo select para listar itens
app.get('/' , (req,res)=> {
    //variavel sql
    const sql = "SELECT * FROM student";
    //execultando a variavel sql
    db.query(sql, (err, result)=>{
        //se der erro, vai mandar uma mensagem de erro no server
        if(err)return res.json({Message: "Erro no servidor"});
        //se tudo estiver ok, vai exibir o banco em um json
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

app.post('/login', (req, res)=>{
    const Email = req.body.Email
    const Nome = req.body.Name

    console.log(Nome)
    console.log(Email)
    db.query("SELECT * FROM student WHERE `Name` = ?", 
    [Nome], (req, result) =>{
        console.log(result)
        if(result.length > 0){
            if(result[0].Email == Email){
                console.log('Logado com sucesso')
            }
            else{
                console.log('Email errado')
            } 
        }
        else{
            console.log('Email ou senha incorreto')
        }
    })
})

app.listen(8081, ()=> {
    console.log("Sucesso");
})