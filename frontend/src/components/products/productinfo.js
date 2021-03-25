import React, {useContext,useState} from "react";
import {Button} from "../styled";
import {CartContext} from "../homepage";
import Modal from "../modal";
import {AnimatePresence} from "framer-motion";
import Alert from "../alert";

const ProductInfo = ({price,description,name,id,image}) => {
    const setCart = useContext(CartContext).setCart;
    const cart = useContext(CartContext).cart;

    const addToCart = (id,name,price,image) => {
        const newCart = cart.concat({id:id,name:name,price:price,image:image});
        setCart(newCart);
        localStorage.setItem("cart",JSON.stringify(newCart));
    }

    const [message,setMessage] = useState(undefined);
    const [dissabled,setDissabled] = useState(false);
    return(
        <>
            <div className="text-white w-50 h-80 m-auto fw-600">
                <img className="my-8 rounded-lg" src={image} alt={image} />
                <p className="text-center product-name">{name}</p>
                <p className="text-center product-price ">Cena: <span className="font-size-20">{price}</span> Kč</p>
                <p className="text-center">{description}</p>
                <Button className="position-relative mx-0" style={{left:"50%",transform:"translateX(-50%)"}} onClick={()=>{
                    !dissabled && addToCart(id,name,price,image);
                    !dissabled && setMessage({text:`${name} přídán do košíku`,error:false});
                    !dissabled && setDissabled(true);
                    setTimeout(()=>{setDissabled(false)},5000);
                }}>
                    Do košíku
                </Button>
            </div>

            <AnimatePresence>
                {message &&
                <Modal>
                   <Alert message={message} setMessage={setMessage}/>
                </Modal>
                }
            </AnimatePresence>
        </>
    );
}

export default ProductInfo;