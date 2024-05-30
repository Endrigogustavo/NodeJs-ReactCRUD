// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => {
        if (res.data.Status === "Sucesso") {
          setAuth(true);
          setName(res.data.name);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch(err => {
        console.error("Erro na requisição:", err);
        setAuth(false);
        setMessage("Erro ao conectar ao servidor");
      });
  }, []);

  return (
    <>
      <div className="container mt-4">
        {
          auth ?
            <div>
              <h3>Você é autorizado {name}</h3>
              <button className="btn btn-danger">Logout</button>
            </div>
            :
            <div>
              <h3>{message}</h3>
              <Link to="/login" className='btn btn-primary'>Login</Link>
            </div>
        }
      </div>
    </>
  );
}

export default Home;
