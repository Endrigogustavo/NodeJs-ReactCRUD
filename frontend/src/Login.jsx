//Importações 
import axios from "axios";
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function Login() {

  //adicionando dados do form para uma variavel
    const [Senha, setSenha] = useState('')
    const [Email, setEmail] = useState('')

    //useNavigate serve para depois do submit ser redirecionado a algum local
    //pegando o ID pelo node e enviando como parametro
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    //classe ativada quando o botão é clicado
    const handleSubmit = (event) =>{
        event.preventDefault();

        //rota do nodejs
        

        //metodo put para fazer o update e envia as classes para o upadte
        axios.post('http://localhost:8081/login', {Email, Senha})
        .then(res =>{
            console.log(res)
            if (res.data.result === "Sucesso") {
              navigate('/list');
            } else {
              alert("Erro ao Logar");
            }
        })
        //envia dos dados para o console
        .catch(err => console.log(err));
    }
  return (
<>
<div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
      <div className="bg-white rounded w-50 p-3">
         <h2>Login</h2>
         <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    onChange={e => setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Senha</label>
    <input type="password" className="form-control" id="exampleInputPassword1"
    onChange={e => setSenha(e.target.value)}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
 </div>
</>
  )
}

export default Login

