import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';
import NavbarComponent2 from "./Navbar2Component";

const ListaMascotaComponent = () => {

return (
    <div>
        <NavbarComponent2></NavbarComponent2>
        <GlobalStyle />    
        <h1>Hola </h1>
        <HomeStyle>
        </HomeStyle>
    </div>
);
}

export default ListaMascotaComponent;


const GlobalStyle = createGlobalStyle`
body { 
    background-color: #FBFBFB;
`
const HomeStyle = styled.nav`

.text-center {
text-align: center;
justify-content: center;
padding-top: 8px;
color: #fff;
}

.box-area{
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
}

.single-box{
position: relative;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 400px;
height: auto;
border-radius: 4px;
background-color: #fff;
text-align: center;
margin: 20px;
padding: 20px;
transition: .3s
}
`