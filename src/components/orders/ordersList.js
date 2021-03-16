import React, {useState,useContext} from "react";
import {Button} from "../styled";
import {CartContext} from "../../pages";
import Modal from "../modal";
import {AnimatePresence} from "framer-motion";
import OrderSmall from "./ordersmall";

export const prepareItems = (array) => {
    var returnedArray = [];
    var counter = {};

    if(array != null){
        array.forEach(function(obj) {
            var key = JSON.stringify(obj)
            counter[key] = (counter[key] || 0) + 1
        })

        Object.entries(counter).forEach((item)=>{
            var obj = {
                data:JSON.parse(item[0]),
                count:item[1],
            }
            returnedArray.push(obj);
        })
    }
    else{
        return null;
    }

    return returnedArray;
}

const OrdersList = ({orders}) => {
    return(
        <div className="w-80 m-auto">
            <h1 className="text-center text-white">Správa objednávek</h1>
            {orders && orders.map((order,index)=>(
                <div key={index}>
                    <OrderSmall order={order}/>
                </div>
            ))}
        </div>
    );
}

export default OrdersList;