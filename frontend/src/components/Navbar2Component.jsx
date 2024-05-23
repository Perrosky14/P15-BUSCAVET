import React from "react";
import styled from "styled-components";

const navStyle = {
};

const headerStyle = {
  backgroundColor: "#FBFBFB",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "85px",
  padding: "5px 10%"
};

const logoContainerStyle = {
  marginRight: "auto" 
};

const logoStyle = {
  width: "200px", /* Establece el ancho del logo */
  height: "auto" /*  Se ajusta proporcionalmente al ancho */
};

function NavbarComponent2(){
    return(
        <>
        <NavStyle>
        <nav style={navStyle}>
                <header className="header" style={headerStyle}>
                    <div className="logo-container" style={logoContainerStyle}>
                        <img src="/images/logo-buscavet-5.png" alt="Logo buscavet" style={logoStyle} />
                    </div>
                <nav>
                </nav>
                <a class="btn" href="/usuario"><button>Volver</button></a>
                </header>
                </nav>
            </NavStyle>
        </>
    )
}

export default NavbarComponent2;


const NavStyle = styled.nav`
.header{
    background-color: #FBFBFB;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 85px;
    padding: 5px 10%;
  }
.header .logo{
    margin-right: auto;
    color: #FF436F;
    font-family: 'Pacifico',serif;
  }
.header .btn button{
    margin-left: 20px;
    font-weight: 700;
    color: #00000;
    padding: 9px 25px;
    background: #eceff1;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
.header .btn button:hover{
    background-color: #e2f1f8;
    color: #000000;
    transform: scale(1.1);
  }
.header .btn-2 button {
    margin-left: 20px;
    font-weight: 700;
    color: #000000;
    padding: 9px 25px;
    background: #eceff1;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }
.header .btn-2 button:hover{
    background-color: #e2f1f8;
    color: #000000;
    transform: scale(1.1);
}
headerStyle = {
  backgroundColor: "#FBFBFB",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "85px",
  padding: "5px 10%"
};

logoContainerStyle = {
  marginRight: "auto" 
};

logoStyle = {
  width: "200px", /* Establece el ancho del logo */
  height: "auto" /*  Se ajusta proporcionalmente al ancho */

`