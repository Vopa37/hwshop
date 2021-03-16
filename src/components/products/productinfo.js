import React, {useContext,useState} from "react";
import {Button} from "../styled";
import {CartContext} from "../../pages";
import Modal from "../modal";
import {AnimatePresence} from "framer-motion";
import {Status} from "../regform/styled";

const ProductAdded = ({message,setMessage,setDissabled}) => (
    <div className="py-8 mx-12">
        <Status error={false}>{message}</Status>
        <p className="d-none">{setTimeout(()=>{setMessage(undefined);setDissabled(false)},2000)}</p>
    </div>
)

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
                <img className="my-8 rounded-lg" src={image}/>
                <p className="text-center product-name">{name}</p>
                <p className="text-center product-price ">Cena: <span className="font-size-20">{price}</span> Kč</p>
                <p className="text-center">{description}</p>
                <Button className="position-relative mx-0" style={{left:"50%",transform:"translateX(-50%)"}} onClick={()=>{
                    !dissabled && addToCart(id,name,price,image);
                    !dissabled && setMessage(`${name} přídán do košíku`);
                    !dissabled && setDissabled(true);
                }}>
                    Do košíku
                </Button>
            </div>

            <AnimatePresence>
                {message &&
                <Modal>
                   <ProductAdded message={message} setDissabled={setDissabled} setMessage={setMessage}/>
                </Modal>
                }
            </AnimatePresence>
        </>
    );
}

export default ProductInfo;