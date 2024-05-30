
import Home from './Home'
import Create from './Create'
import Update from './Update'
import Login from './Login'
import { Routes, Route } from "react-router-dom";
function App() {

  return (
<>
<Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/update/:ID" element={<Update/>} />
          <Route path="/login" element={<Login/>} />
</Routes>
</>
  )
}

export default App

