import styled from "styled-components";
import Theme from "../theme";

export const Icon = styled.div`
  width: ${(props) => props.size};
  margin: auto;
`;

export const PlanetImg = styled.img`
  width: 70%;
  height: 70%;
  margin: auto;
  @media screen and (min-width: 992px) {
    margin-top: 120px;
  }
  margin-bottom: 50px;
`;

export const Title = styled.h1`
  color: ${Theme.palette.secondaryLight};
  font-size: 2rem;
  @media screen and (min-width: 992px) {
    font-size: 2.5rem;
  }
`;

export const BoxTitle = styled.h2`
  margin-top: 15px;
  font-size: 1rem;
  font-weight: bold;
  color: ${Theme.palette.secondaryLight};
`;

export const BoxText = styled.p`
  font-size: 0.8rem;
  color: ${Theme.palette.secondaryLight};
`;
