import React, {useState} from "react";
import LogForm from "../logform";
import RegForm from "../regform";
import {Button} from "../styled";
import axios from "axios";
import {AnimatePresence} from "framer-motion";
import Modal from "../modal";
import {Status} from "../styled";


const OrderCompleted = ({message,setMessage}) => (
    <div className="py-8 mx-12">
        <Status error={message.error}>{message.text}</Status>
        <p className="d-none">{setTimeout(()=>{setMessage(undefined);setTimeout(()=>{document.location.href="/";},500)},2000)}</p>
    </div>
)

const countOrderPrice = (data) => {

    let orderPrice = 0;

    data.map((item)=>{
        orderPrice += (item.count*item.data.price);
        return null;
    })

    return orderPrice;
}

const countCartItems = (data) => {

    let totalItems = 0;

    data.map((item)=>{
        totalItems += item.count;
        return null;
    })

    return totalItems;
}

const sendOrder = (user,data,price,setMessage) => {
    axios.post("/order",{userId:user._id,items:data,price:price,completed:false}).then((res)=>{
        setMessage(res.data);
        localStorage.removeItem("cart");
    }).catch((error)=>{
        console.log(error);
    })
}


const OrderSummary = ({data}) => {
    const [reg,setReg] = useState(false);
    const [log,setLog] = useState(true);
    const [message,setMessage] = useState(undefined);

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
            <Button className="position-relative mx-0 my-6" style={{left:"50%",transform:"translateX(-50%)"}} onClick={()=>{sendOrder(user,data,countOrderPrice(data),setMessage)}}>Odeslat objednávku</Button>
            <AnimatePresence>
                {message &&
                <Modal>
                    <OrderCompleted message={message} setMessage={setMessage}/>
                </Modal>
                }
            </AnimatePresence>
        </div>
    ) : (
        <div>
            <p className="text-white text-center">Abyste mohli odeslat objednávku, musíte se <span role="button" styling="link" tabIndex={-1} className="text-black-50 cursor-pointer" onClick={()=>{setReg(false); setLog(true)}} onKeyDown={()=>{setReg(false); setLog(true)}}>příhlásit</span>/<span role="button" styling="link" tabIndex={0} className="text-black-50 cursor-pointer" onClick={()=>{setLog(false); setReg(true)}} onKeyDown={()=>{setLog(false); setReg(true)}}  >zaregistrovat</span></p>
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