import styled from "styled-components";
import Theme from "../theme";

export const Title = styled.h4`
  font-weight: 500;
  color: ${Theme.palette.secondaryLight};
`;

export const ImageWrap = styled.div`
  margin: auto;
  padding: 1rem 0;
  height: 12rem;
  width: 12rem;
`;

export const Image = styled.img`
    width:100%;
    height:100%;
    border-radius: 1rem;
`;

export const DescriptionText = styled.p`
  font-family: Raleway;
  color: ${Theme.palette.primary};
  font-size: 15px;
  font-weight: 500;
`;

export const MedailonWrap = styled.div`
  background-color: ${Theme.palette.secondary};
  color: white;
  border-radius: 10px;
  height: 20rem;
  transform: scale(1);
  margin: 2rem 0;
  transition-duration: 0.6s;
  &:hover {
    transform: scale(1.1);
    transition-duration: 0.6s;
    cursor: pointer;
  }
`;

export const FilterLabel = styled.p`
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  color: #fec82f;
  margin: 0;
  margin-top: 4px;
`;

export const MedailonTitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 1rem 0;
`;

export const Form = styled.form`
    display:flex;
    @media(max-width:992px){
    display:block;
    }
`;

export const FilterWrap = styled.div`
    margin: auto;
    display:flex;
    justify-content:flex-end;
    
    @media(max-width:992px){
    justify-content:center;
    }
`;
