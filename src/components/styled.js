import styled from "styled-components";
import Theme from "./theme";
import React from "react";
import { Form as FormikForm, Field } from "formik";

export const Root = styled.div`
  width: 90%;
  @media screen and (min-width: 992px) {
    width: 82%;
  }
  margin: auto;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
`;

export const Form = styled(FormikForm)`
  width: 40%;
  align-items: center;
  margin: auto;
`;

export const Input = styled(Field)`
  margin:auto;
  padding: 0;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding-left: 20px;
  border: ${(props) => (props.error ? "2px solid red" : "none")};
  :focus {
    border: 1px solid grey;
  }
  outline: none;
`;

export const InputArea = styled(Field)`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 125px;
  border-radius: 10px;
  padding-left: 20px;
  border: ${(props) => (props.error ? "2px solid red" : "none")};
  margin-top: 5px;
`;

export const Error = styled.p`
  visibility: ${(props) => (props.visibility ? "visible" : "hidden")};
  color: white;
  margin-bottom: 10px;
  padding-left: 3px;
`;

export const Status = styled.div`
  color: white;
  width: 100%;
  margin: 1rem auto;
  font-size:2rem;
  text-align:center;
  font-weight:900;
`;

export const PageRoot = styled.div`
  display:flex;
  flex-direction:column;
  text-align: center;
  background-color: ${Theme.palette.primary}; 
  color: ${Theme.palette.secondary};
  font-family: ${Theme.fonts.primary};
  font-size: ${Theme.fontBaseSize};
  min-height: 100vh;
  overflow-x: hidden;
`;

export const Main = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6rem;
  max-width: 1440px;
`;

export const MenuTarget = styled.a`
  display: block;
  position: relative;
  top: -250px;
  visibility: hidden;
`;

export const Button = styled.button`
  cursor:pointer;
  max-width: 10rem;
  min-width: 6rem;
  margin: 0 2rem 2rem 2rem;
  width: 50%;
  height:2rem;
  background-color:${Theme.palette.secondary};
  color:${Theme.palette.text};
  border:0;
  border-radius: 2rem;
  transition-duration: 0.6s;
  &:hover {
    transform: scale(1.1);
    transition-duration: 0.6s;
    cursor: pointer;
  }
  
`;

export const ModalAlert = ({message,setMessage,redirectDisable}) => (
    <div className="py-8 mx-12">
        <Status error={message.error}>{message.text}</Status>
        <p className="d-none">{setTimeout(()=>{setMessage(undefined);setTimeout(()=>{redirectDisable ? ()=>{} : document.location.href="/" ;localStorage.removeItem("cart")},500)},2000)}</p>
    </div>
)