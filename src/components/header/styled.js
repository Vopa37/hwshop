import styled from "styled-components";
import Theme from "../theme";
import AnchorLink from "react-anchor-link-smooth-scroll";

export const Root = styled.div`
  width: 100%;
  background-color: ${Theme.palette.primary};
  z-index: 2;
`;

export const WidthWrapper = styled.div`
  max-width: 1440px;
  margin: auto;
`;

export const Title = styled.h1`
  color: ${Theme.palette.text};
  text-align: center;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const StyledImg = styled.div`
  float: left;
  height: 30px;
  width: 30px;
  @media screen and (min-width: 992px) {
    height: 50px;
    width: 50px;
    margin: 7px;
  }
  margin: 12px;
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
`;

export const UserId = styled.div`
    max-width: 20rem;
    width: 50%;
    background-color:white;
    margin: 2rem auto;
    border-radius: 2rem;
`;

