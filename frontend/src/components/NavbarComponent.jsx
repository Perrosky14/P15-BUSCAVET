import React from "react";
import styled from "styled-components";

function NavbarComponent(){
    return(
        <>
        <NavStyle>
            <header class="header">
                <div class="logo">
                    <h1>BUSCAVET</h1>
                </div>
                <nav>
                </nav>
            </header>
            </NavStyle>
        </>
    )
}

export default NavbarComponent;


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
`