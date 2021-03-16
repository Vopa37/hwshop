import React from "react";
import { FooterStyled } from "./styled";

const Footer = () => {
  return (
    <FooterStyled>
      <footer className="text-white py-7 " data-navbar="smart">
        <div className="container">
            <p>© HardwareStore</p>
            <p>Autor:Vojtěch Pavelka</p>
            <p>Email:<a style={{fontWeight:900}} href="mailto:vojtechpavelka37@gmail.com?subject=dotaz">vojtechpavelka37@gmail.com</a></p>
        </div>
      </footer>
    </FooterStyled>
  );
};

export default Footer;
