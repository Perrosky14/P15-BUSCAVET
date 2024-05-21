import './App.module.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import FichaMascotaComponent from './components/FichaMascotaComponent';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/ficha_mascota" element={<FichaMascotaComponent />} />
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
