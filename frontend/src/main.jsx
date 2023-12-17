//biblioteca que serve no lugr do hraf
import {BrowserRouter} from "react-router-dom";

//import da biblioteca
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  //classe de link
  <BrowserRouter>
    <App />
  </BrowserRouter>
);