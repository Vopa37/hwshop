import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
  margin-bottom: 6rem;
  @media screen and (min-width: 480px) {
    transform: rotate(-4.42deg);
  }
  margin-left: auto;
  margin-right: auto;
  max-width: 1440px;
`;

export const Text = styled.p`
  text-align: center;
  color: ${(props) => props.color};
  margin: 0;
  font-weight: 300;
  font-size: 1.5rem;
  @media screen and (min-width: 480px) {
    text-align: left;
    margin-left: 8%;
  }
`;

export const Line = styled.div`
  width: 95%;
  border: 1px solid ${(props) => props.color};
  background-color: ${(props) => props.color};
  height: 0px;
  margin: auto;
  border-radius: 50px;
`;

export const AnimationWrapper = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;
