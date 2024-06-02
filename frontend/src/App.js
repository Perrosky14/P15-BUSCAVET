import './App.module.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import FichaMascotaComponent from './components/FichaMascotaComponent';
import RegistarMascotaComponent from './components/RegistrarMascotaComponent';
import ListaMascotaComponent from './components/ListaMascotaComponent';
import HomeUsuarioComponent from './components/HomeUsuarioComponent';
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/registrar_mascota" element={<RegistarMascotaComponent/>} />
        <Route path="/lista_mascota" element={<ListaMascotaComponent/>} />
        <Route path="/ficha_mascota" element={<FichaMascotaComponent />} />
        <Route path="/usuario" element={<HomeUsuarioComponent />} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
