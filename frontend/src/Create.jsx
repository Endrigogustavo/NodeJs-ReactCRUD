import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Create() {

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const navigate = useNavigate();
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:8081/create', {Name,Email})
        .then(res =>{
            navigate('/')
        }).catch(err => console.log(err));
    }
  return (
<>
<div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
      <div className="bg-white rounded w-50 p-3">
         <h2>Create</h2>
         <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label  className="form-label">Nome</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
    onChange={e => setName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label  className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputPassword1"
    onChange={e => setEmail(e.target.value)}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
 </div>
</>
  )
}

export default Create

