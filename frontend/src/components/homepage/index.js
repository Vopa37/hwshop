import React, {useEffect, useState} from "react";

import Header from "../header";
import Footer from "../footer";
import Products from "../products";
import {MenuTarget} from "../styled";
import axios from "axios";

export const ProductsContext = React.createContext();
export const CartContext = React.createContext();
export const UserContext = React.createContext();


const Homepage = () => {

    const [cart,setCart] = useState([]);
    const [products, setProducts] = useState(undefined);
    const [users, setUsers] = useState(undefined);
    const [user, setUser] = useState(undefined);

    useEffect(()=>{
        axios.get("/product").then((res)=>{
            setProducts(res.data);
        });

        axios.get("/user").then((res)=>{
            setUsers(res.data);
        });
    },[]);

    return(
        <ProductsContext.Provider value={{products:products,setProducts:setProducts}}>
            <CartContext.Provider value={{cart:cart,setCart:setCart}}>
                <UserContext.Provider value={{users:users,setUsers:setUsers,user:user,setUser:setUser}}>
                        <MenuTarget id="Home"/>
                        <Header/>
                        <MenuTarget id="Produkty"/>
                        <Products/>
                        <Footer/>
                </UserContext.Provider>
            </CartContext.Provider>
        </ProductsContext.Provider>
    );
}

export default Homepage;