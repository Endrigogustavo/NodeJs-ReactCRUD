// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react'
import axios from 'axios'
function Home() {
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
    // eslint-disable-next-line react/jsx-key
    <p>{d.Name}</p>
   ))}
</div>
</>
  )
}

export default Home
