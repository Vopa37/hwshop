import styled from "styled-components";
import Theme from "../theme";
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

export const Button = styled.button`
  width: 40%;
  margin:auto;
  height: 40px;
  background-color: ${(props) => (props.submitted ? "#32CD32" : "#1A1449")};
  color:white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  :hover {
    opacity: ${(props) => (props.submitted ? "" : 0.7)};
    cursor: ${(props) => (props.submitted ? "" : "pointer")};
  }
`;

export const Status = styled.div`
    color: ${({error}) => error ? "red" : "green"};
    width: 100%;
    margin: 1rem auto;
`;

