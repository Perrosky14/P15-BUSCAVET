import './App.module.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserSessionComponent from './components/UserSessionComponent';
import RegisterComponent from './components/RegisterComponent';
import RegisterTutorComponent from './components/RegisterTutorComponent'

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={< UserSessionComponent/>}/>
        <Route path="/registro" element={<RegisterComponent/>}/>
        <Route path="/registroTutor" element = {<RegisterTutorComponent/>}/>
        <Route path="/registroVeterinario"/>
        <Route path="/registroCentro"/>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
