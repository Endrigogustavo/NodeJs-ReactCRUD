
// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import axios from 'axios'
function App() {
    const [data, setData] = useState([])
    useEffect(()=> {
         fetch('http://localhost:8081/')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])
  return (
<>

<div>
   {data.map(d =>(
    <>
    <p>{d.ID}</p>
    <p>{d.Name}</p>
    <p>{d.Email}</p>
    </>
    
   ))}
</div>
</>
  )
}

export default App

