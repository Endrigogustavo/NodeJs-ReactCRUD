import  express  from "express";
import mysql from 'mysql';
import cors from 'cors';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt';
const salt = 10

//Configuração das variaveis ambiente
dotenv.config({path: './.env'})

//importando dados das bibliotecas
const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));

//pegando o banco e transformando em um json
app.use(express.json())

app.use(cookieParser())


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

const verifyUser = (req, res, next) =>{
    const token = req.cookie.token;
    if(!token){
        return res.json({Error: "Não Autenticado"})
    } else{
        jwt.verify(token, "jwt-secret-key", (err, decoded) =>{
            if(err){
                return res.json({Error: "Token com problema"})
            } else{
                req.name = decoded.name;
                next();
            }
        })
    }
}
app.get('/', verifyUser, (req, res) =>{
    return res.json({Status: "Sucesso", name: req.name})
})
//Home com o metodo select para listar itens
app.get('/list' , (req,res)=> {
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

app.post('/login', (req, res)=>{
    const Email = req.body.Email
    const Senha = req.body.Senha

    db.query("SELECT * FROM student WHERE `Email` = ?", 
    [Email], (err, result) =>{
        console.log(result)
        if(result.length > 0){
            bcrypt.compare(req.body.Senha.toString(), result[0].Senha, (err, response) =>{
                console.log(result)
                if(err) return res.json({Error: "Erro no servidor"})

                    if(response){
                        const name = result[0].Name
                        const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: `1D`});
                        res.cookie('token', token, { httpOnly: true, secure: false });
                        res.json({ result: 'Sucesso' });
                        console.log("Logado com sucesso")
                    }
                    else{
                        res.json({ result: 'Sucesso' });
                    }
            })  
            } else{
                return res.json({Status: "Email não exise"})
            }
        })
})

//

app.listen(8081, ()=> {
    console.log("Sucesso");
})