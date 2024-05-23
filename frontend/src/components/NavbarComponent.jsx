import React from "react";

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

function NavbarComponent(){
      return (
        <>
            <nav style={navStyle}>
                <header className="header" style={headerStyle}>
                    <div className="logo-container" style={logoContainerStyle}>
                        <img src="/images/logo-buscavet-5.png" alt="Logo buscavet" style={logoStyle} />
                    </div>
                    <nav>
                    </nav>
                </header>
            </nav>
        </>
    );
}

export default NavbarComponent;