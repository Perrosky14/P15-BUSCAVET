import React, { useState } from 'react';
import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';
import NavbarComponent from "./NavbarComponent";
import Modal from './Modal/Modal';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

const HomeComponent = () => {
    const [isModalOpen, setModalOpen] = useState(false);
  
    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
    

    return (
        <div>
            <NavbarComponent></NavbarComponent>
            <GlobalStyle /> 
            <button onClick={openModal}>Open Modal</button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <Button variant="light">Registro</Button>{' '}
                    <Button variant="light">Log in</Button>{' '}
                    <CloseButton aria-label="Hide" onClick={closeModal}/>
                    <h2>O registrate con tu email</h2>
                </Modal>
            <h1>hola3</h1>
            <HomeStyle>
            </HomeStyle>
        </div>
    );
}

export default HomeComponent;


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