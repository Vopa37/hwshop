import React, {useState} from "react";
import LogForm from "../logform";
import RegForm from "../regform";
import {Button} from "../styled";
import axios from "axios";
import {AnimatePresence} from "framer-motion";
import Modal from "../modal";
import {prepareItems} from "./index";

const countOrderPrice = (data) => {

    let orderPrice = 0;

    data.map((item)=>{
        orderPrice += (item.count*item.data.price);
    })

    return orderPrice;
}

const countCartItems = (data) => {

    let totalItems = 0;

    data.map((item)=>{
        totalItems += item.count;
    })

    return totalItems;
}

const sendOrder = (user,data,price,setOrderComplete) => {
    console.log(user._id);
    console.log(data);
    console.log(price);
    axios.post("http://localhost:5000/order",{userId:user._id,items:data,price:price,completed:false}).then((req,res)=>{
        setOrderComplete(true);
        localStorage.removeItem("cart");
    }).catch((error)=>{
        console.log(error);
    })
}

const OrderSummary = ({data}) => {
    const [reg,setReg] = useState(false);
    const [log,setLog] = useState(true);
    const [orderComplete,setOrderComplete] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    if(data != null){
    return localStorage.getItem("user") ? (
        <div>
            <h1 className="text-white text-center mb-8">Shrnutí objednávky</h1>
            <p className="text-white text-center" >Celková cena objednávky {countOrderPrice(data)} Kč </p>
            <p className="text-white text-center" >Celkový počet zboží v objednávce: {countCartItems(data)} </p>
            <div className="my-8">
                <h2 className="text-white text-center mb-8" >Informace o uživateli</h2>
                <p className="text-white text-center" >Jméno: {user.firstname}</p>
                <p className="text-white text-center" >Příjmení: {user.lastname}</p>
                <p className="text-white text-center" >Email: {user.email}</p>
            </div>
            {data.map((item)=>(
                <div className="bg-white d-flex my-8 w-80 mx-auto rounded-lg">
                    <div className="w-50 text-center">
                        <p className="my-4">{item.data.name}</p>
                        <p className="my-4">{item.data.price} Kč</p>
                    </div>
                    <div className="w-50 text-center d-flex flex-column justify-content-center">
                        <p>Počet: {item.count}</p>
                    </div>
                </div>
            ))}
            <Button className="position-relative mx-0 my-6" style={{left:"50%",transform:"translateX(-50%)"}} onClick={()=>{sendOrder(user,data,countOrderPrice(data),setOrderComplete)}}>Odeslat objednávku</Button>
            <AnimatePresence>
                {orderComplete &&
                <Modal toggle={setOrderComplete}>
                    <div>
                        <h1>Objednávka odeslána</h1>
                        <p>SDSDSDSD</p>
                    </div>
                </Modal>
                }
            </AnimatePresence>
        </div>
    ) : (
        <div>
            <p className="text-white text-center">Abyste mohli odeslat objednávku, musíte se <a className="text-black-50 cursor-pointer"onClick={()=>{setReg(false); setLog(true)}}>příhlásit</a>/<a className="text-black-50 cursor-pointer" onClick={()=>{setLog(false); setReg(true)}}>zaregistrovat</a></p>
                {log &&
                    <LogForm toggle={setLog}/>
                }
                {reg &&
                    <RegForm toggle={setReg}/>
                }
        </div>
    );
    }else{
        return(<p className="text-center text-white">Košík je prázdný</p>)
    }
}

export default OrderSummary;