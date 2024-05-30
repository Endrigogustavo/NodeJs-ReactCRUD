
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'bootstrap';


function App() {
  //pega os dados do banco
    const [data, setData] = useState([])

    //comando "Insert" na variavel
    useEffect(()=> {
      //local do server
         axios.get('http://localhost:8081/home')
         //metodo set do banco
        .then(res => setData(res.data))
        //enviando para o console
        .catch(err => console.log(err));
    })
    //useNavigate serve para depois do submit ser redirecionado a algum local
    const navigate = useNavigate();


    //--------------------------função "Delete"-------------------------------
    //classe ativada quando o botão é clicado
    const handleDelete = (ID) => {
      //local do server com o metodo delete
      axios.delete('http://localhost:8081/delete/'+ID)
      //mantendo no mesmo local
      .then(res => navigate('/'))
      //mostrando dados de erro no console 
      .catch(err => console.log(err))
    }
  return (
<>
 <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
      <div className="bg-white rounded w-50 p-3">
         <h2>Crud</h2>
          <Link to="/create" className='btn btn-success'>Add +</Link>
         <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              
                {data.map( (d ,i) => (
                  //.map para pegar dados do banco e transformar em uma variavel

                  //{d.Name} pega todos os Name do banco, a mesma coisa para o Email
                  <tr>
                    
                    <td>{d.Name}</td>
                    <td>{d.Email}</td>
                    
                    <td>
                        <Link to={`/update/${d.ID}`}  className='btn btn-sm btn-primary'>Update</Link>
                        <button onClick={e => handleDelete(d.ID)} className='btn btn-sm btn-danger'>Delete</button>
                    </td>
                  </tr>



                ))}
            </tbody>
         </table>
      </div>
 </div>

</>
  )
}

export default App

