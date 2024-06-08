import './App.module.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSessionComponent from './components/UserSessionComponent';
import RegisterComponent from './components/RegisterComponent';
import RegisterTutorComponent from './components/RegisterTutorComponent'
import RegisterVeterinario from './components/RegisterVeterinario'

import HomeComponent from './components/HomeComponent';
import FichaMascotaComponent from './components/FichaMascotaComponent';
import RegistarMascotaComponent from './components/RegistrarMascotaComponent';
import ListaMascotaComponent from './components/ListaMascotaComponent';
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/registrar_mascota" element={<RegistarMascotaComponent/>} />
        <Route path="/lista_mascota" element={<ListaMascotaComponent/>} />
        <Route path="/ficha_mascota" element={<FichaMascotaComponent />} />
        <Route path="/login" element={< UserSessionComponent/>}/>
        <Route path="/registro" element={<RegisterComponent/>}/>
        <Route path="/registroTutor" element = {<RegisterTutorComponent/>}/>
        <Route path="/registroVeterinario"element = {<RegisterVeterinario/>}/>
        <Route path="/registroCentro"/>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
