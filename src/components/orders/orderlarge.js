import React from "react";
import {Button} from "../styled";

const OrderLarge = ({data,completeOrder,setOrderDetail}) => {
    return(
        <div className="bg-white rounded-lg w-80 mx-auto my-6 p-4">
            <h4 className="text-center">{data.order._id}</h4>
            {data.user &&
            <>
                <p className="text-center">Uživatel: {data.user.firstname} {data.user.lastname}</p>
                <p className="text-center">Email: {data.user.email}</p>
            </>
            }
            <p className="text-center">Stav: {data.order.completed ? <span style={{color:"green"}}>Vyřízená</span> : <span style={{color:"red"}}>Probíhá</span>}</p>
            {data.order.items.map((item,index)=>(
                <div className="my-4 text-center item-bordered" key={index}>
                    <p>{item.data[0].name}</p>
                    <div className="w-30 m-auto">
                        <img src={item.data[0].image}/>
                    </div>
                    <p>Počet kusů v objednávce: {item.count}</p>
                    <p>Cena za kus: {item.data[0].price} Kč</p>
                    <p>Celková cena za tento produkt: {item.data[0].price * item.count} Kč</p>
                </div>
            ))}
            <p className="text-center my-4 font-size-20">Celková cena objednávky: <span className="text-underline">{data.order.price} Kč</span></p>
            {data.user && !data.order.completed && <Button className="position-relative mx-0 my-6" style={{left:"50%",transform:"translateX(-50%)"}} onClick={()=>{completeOrder(data.order._id,setOrderDetail)}}>Dokončit objednávku</Button>
            }
        </div>

    )
}

export default OrderLarge;