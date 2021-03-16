import React, {useState} from "react";
import { Image, ImageWrap, MedailonWrap, MedailonTitle } from "./styled";
import Modal from "../modal";
import {AnimatePresence} from "framer-motion";
import ProductInfo from "./productinfo";


const Medailon = ({ name, image, price, description, id}) => {
    const [isOpen,setOpen] = useState(false);
      return (
          <>
          <MedailonWrap onClick={()=>{setOpen(true)}}>
            <ImageWrap>
              <Image src={image}/>
            </ImageWrap>
            <MedailonTitle>{name}</MedailonTitle>
              <MedailonTitle>{`Cena : ${price} Kč`}</MedailonTitle>
          </MedailonWrap>
              <AnimatePresence>
                  {isOpen &&
                  <Modal toggle={setOpen}>
                      <ProductInfo name={name} price={price} description={description} id={id} image={image}/>
                  </Modal>
                  }
              </AnimatePresence>
          </>
      );
};

export default Medailon;
