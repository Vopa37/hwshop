import styled from "styled-components";
import { motion } from "framer-motion";
import Theme from "../theme";

export const Close = styled.svg`
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  top: 1rem;
  right: 1rem;
`;

export const Overlay = styled(motion.div)`
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  overflow: auto;
`;

export const ModalContent = styled(motion.div)`
  display: block;
  background-color: ${Theme.palette.primary};
  margin: auto;
  top: 50%;
  width: 100%;
  @media (max-width: 500px) {
    width: 80%;
  }
  max-width: 49.4375rem;
  border-radius: 1%;
`;

export const InsideWrap = styled.div`
  position: relative;
  min-height: 100%;
  display: flex;
  justify-content: center;
`;
