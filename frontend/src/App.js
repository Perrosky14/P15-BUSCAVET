import './App.module.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSessionComponent from './components/UserSessionComponent';
import RegisterComponent from './components/RegisterComponent';
import RegisterTutorComponent from './components/RegisterTutorComponent'

import HomeComponent from './components/HomeComponent';
import FichaMascotaComponent from './components/FichaMascotaComponent';
import RegistarMascotaComponent from './components/RegistrarMascotaComponent';
import ListaMascotaComponent from './components/ListaMascotaComponent';
import HomeVeterinariaComponent from "./components/HomeVeterinariaView/MainViewHomeVeterinariaComponent";
import MainViewDoctoresVeterinaria from "./components/DoctoresVeterinariaView/MainViewDoctoresVeterinaria";
import HomeUsuarioComponent from './components/HomeUsuarioComponent';
import AgendamientoUsuarioComponent from './components/AgendamientoUsuarioComponent';
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/registrar_mascota" element={<RegistarMascotaComponent/>} />
        <Route path="/lista_mascota" element={<ListaMascotaComponent/>} />
        <Route path="/ficha_mascota" element={<FichaMascotaComponent />} />
        <Route path="/agendar_hora" element={<AgendamientoUsuarioComponent />} />
        <Route path="/usuario" element={<HomeUsuarioComponent />} />
        <Route path="/login" element={< UserSessionComponent/>}/>
        <Route path="/registro" element={<RegisterComponent/>}/>
        <Route path="/registroTutor" element = {<RegisterTutorComponent/>}/>
        <Route path="/registroVeterinario"/>
        <Route path="/registroCentro"/>
        <Route path="/veterinaria" element={<HomeVeterinariaComponent/>}/>
        <Route path="/veterinaria/doctores" element={<MainViewDoctoresVeterinaria/>}/>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
