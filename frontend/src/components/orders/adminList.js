import React, {useState,useEffect,useContext} from "react";
import axios from "axios";
import {UserContext} from "../homepage";
import OrderSmall from "./ordersmall";

const AdminList = () => {
    const [orders,setOrders] = useState(undefined);
    const users = useContext(UserContext).users;
    const completeOrder = (orderId,setOrderDetail) => {
        axios.put("/order/complete",{id:orderId}).then((res)=>{
            setOrderDetail(undefined);
        });
    }

    useEffect(() => {
        let mounted = true;
        axios.get("/order/all").then(response => {
                mounted && setOrders(response.data);
            }
        );

        return () => mounted = false;
    }, []);

    const getUser = (userId) => {
       return users.find(user => user._id === userId);
    }

    return(
        <div className="w-80 m-auto">
            <h1 className="text-center text-white">Správa objednávek</h1>
            {orders && orders.map((order,index)=>(
                <div key={index}>
                <OrderSmall order={order} user={getUser(order.userId)} completeOrder={completeOrder}/>
                </div>
            ))}
        </div>
    );
}

export default AdminList;