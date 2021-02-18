import React, {useEffect, useState} from "react";
import {
    Root,
  Title,
  WidthWrapper,UserId
} from "./styled";

import {Button} from "../styled";

import cart from "../../images/cart.svg";

import Modal from "../modal/";

import RegForm from "../regform";
import LogForm from "../logform";
import ManageUsers from "../manageusers";
import ManageProducts from "../manageproducts";
import ShoppingCart from "../shoppingcart";
import {AnimatePresence} from "framer-motion";
import EditUser from "../manageusers/edituser";
import axios from "axios";
import OrdersList from "../orders/ordersList";
import AdminList from "../orders/adminList";

const Header = () => {
    const [reg,setReg] = useState(false);
    const [log,setLog] = useState(false);
    const [user,setUser] = useState(undefined);
    const [logOffState,setLogOff] = useState(false);
    const [usersInterface,setUsersInterface] = useState(false);
    const [productsInterface,setProductsInterface] = useState(false);
    const [ordersInterface,setOrdersInterface] = useState(false);
    const [cartOpen,setOpenCart] = useState(false);
    const [editUser,setEditUser] = useState(undefined);
    const [orders,setOrders] = useState(undefined);
      useEffect(()=>{
          setUser(localStorage.getItem("user"));
      });

    const logOff = () => {
        setLogOff(true);
        setTimeout(()=>{ localStorage.clear();setUser(undefined); setLogOff(false)},2000);
    }

    const getOrders = (userId) => {
        axios.get("http://localhost:5000/order",{params:{userId:userId}}).then((res)=>{
            setOrders(res.data);
        })
    }

  return (

    <Root>
      <WidthWrapper>
      <div>
          <Title>
              Hardware Store
          </Title>
          {!user &&
              <>
                <Button onClick={()=>{setLog(true)}}>Login</Button>
                <Button onClick={()=>{setReg(true)}}>Registrace</Button>
              </>
          }
          <div className="w-40px h-40px mx-auto cursor-pointer pb-8 hover-move-up" onClick={()=>{setOpenCart(true)}}><img src={cart}/></div>
          {user &&
              <UserId>
                  <p>Uživatel: {JSON.parse(user).username}</p>
                  {localStorage.getItem("admin") === "true" &&
                  <div>
                      <p className="text-black">Vítejte v adminovském rozhraní</p>
                      <Button onClick={setUsersInterface}>Správa uživatelů</Button>
                      <Button onClick={setProductsInterface}>Správa produktů</Button>
                      <Button onClick={()=>{setOrdersInterface(true)}}>Správa objednávek</Button>
                  </div>}
                  {!JSON.parse(user).admin && (
                      <Button onClick={()=>{setEditUser(JSON.parse(user))}}>Upravit informace</Button>
                  )}
                  <Button onClick={()=>{getOrders(JSON.parse(user)._id)}}>Mé objednávky</Button>
                  <Button onClick={logOff}>Odhlásit se</Button>
                  {logOffState && <p className="text-black">Odhlašování...</p>}
              </UserId>
            }
        <div>
          <AnimatePresence>
            {reg &&
            <Modal toggle={setReg}>
                <RegForm/>
            </Modal>
            }
          </AnimatePresence>
            <AnimatePresence>
            {log &&
            <Modal toggle={setLog}>
                <LogForm/>
            </Modal>
            }
            </AnimatePresence>
            <AnimatePresence>
                {usersInterface &&
                <Modal toggle={setUsersInterface}>
                    <ManageUsers toggle={setUsersInterface}/>
                </Modal>
                }
            </AnimatePresence>
            <AnimatePresence>
                {productsInterface &&
                <Modal toggle={setProductsInterface}>
                    <ManageProducts toggle={setProductsInterface}/>
                </Modal>
                }
            </AnimatePresence>
            <AnimatePresence>
                {cartOpen &&
                <Modal toggle={setOpenCart}>
                    <ShoppingCart toggle={setOpenCart}/>
                </Modal>
                }
            </AnimatePresence>
            <AnimatePresence>
                {editUser &&
                <Modal toggle={setEditUser}>
                    <EditUser admin={false} user={editUser} toggle={setEditUser}/>
                </Modal>
                }
            </AnimatePresence>
            <AnimatePresence>
                {orders &&
                <Modal toggle={setOrders}>
                    <OrdersList data={orders}/>
                </Modal>
                }
            </AnimatePresence>
            <AnimatePresence>
                {ordersInterface &&
                <Modal toggle={setOrdersInterface}>
                    <AdminList/>
                </Modal>
                }
            </AnimatePresence>
        </div>
      </div>
      </WidthWrapper>
    </Root>
  );
};

export default Header;
