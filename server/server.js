import  express  from "express";
import mysql from 'mysql';
import cors from 'cors';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
const salt = 10

//Configuração das variaveis ambiente
dotenv.config({path: './.env'})

//importando dados das bibliotecas
const app = express();
app.use(cors());

//pegando o banco e transformando em um json
app.use(express.json())

//conectando no banco
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE
})

db.connect((error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("Conectado com sucesso ao Banco")
    }
})

//Home com o metodo select para listar itens
app.get('/home' , (req,res)=> {
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
    const sql = "INSERT INTO student (`Name`,`Email`,`Senha`) VALUES (?)"
    const Senha = req.body.Senha
    bcrypt.hash(Senha.toString(), salt, (err, hash)=>{
        if(err){
            console.log(err)
        }

        const values = [
            req.body.Name,
            req.body.Email,
            hash
        ]
        db.query(sql, [values], (err, data) =>{
            if(err) return res.json(err);
            return res.json("Created")
        })
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

app.post('/', (req, res)=>{
    const Email = req.body.Email
    const Senha = req.body.Senha
    const Nome = req.body.Name
    

    db.query("SELECT * FROM student WHERE `Name` = ?", 
    [Nome], (req, result) =>{
        console.log(result)
        if(result.length > 0){
            console.log(result)
                
                if(result[0].Email == Email){
                    console.log('Logado com sucesso')
                    res.json({ result: 'Sucesso' });
                }
                else{
                    console.log('Email errado')
                } 
            }
            else{
                console.log('Email ou senha incorreto')
            }
            
           }
       
    )
})

//bcrypt.compare(req.body.Senha.toString, result[0].SenhaForm, (err, response)

app.listen(8081, ()=> {
    console.log("Sucesso");
})