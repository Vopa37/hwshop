import React, {useEffect, useState} from "react";

import { PageRoot, MenuTarget } from "../components/styled";

import Header from "../components/header/.";
import Footer from "../components/footer/.";
import Products from "../components/products";
import axios from "axios";


export const ProductsContext = React.createContext();
export const CartContext = React.createContext();
export const UserContext = React.createContext();

const IndexPage = () => {
    const [cart,setCart] = useState([]);
    const [products, setProducts] = useState(undefined);
    const [users, setUsers] = useState(undefined);
    const [user, setUser] = useState(undefined);

    useEffect(()=>{
        axios.get("http://localhost:5000/product").then((res)=>{
            setProducts(res.data);
        });

        axios.get("http://localhost:5000/user").then((res)=>{
            setUsers(res.data);
        });
    },[]);

    return(
        <ProductsContext.Provider value={{products:products,setProducts:setProducts}}>
            <CartContext.Provider value={{cart:cart,setCart:setCart}}>
                <UserContext.Provider value={{users:users,setUsers:setUsers,user:user,setUser:setUser}}>
                <PageRoot>
                    <MenuTarget id="Home"/>
                        <Header/>
                    <MenuTarget id="Produkty"/>
                        <Products/>
                    <Footer/>
                </PageRoot>
                </UserContext.Provider>
            </CartContext.Provider>
        </ProductsContext.Provider>
    );
}

export default IndexPage;
