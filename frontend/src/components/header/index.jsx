import React, {useContext, useEffect, useState} from "react";
import {
    Root,
  Title,
  WidthWrapper,UserId
} from "./styled";

import {Button} from "../styled";

import cart from "../../images/cart.svg";

import Modal from "../modal";

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
import {UserContext} from "../homepage";

const Header = () => {
    const [reg,setReg] = useState(false);
    const [log,setLog] = useState(false);
    const user = useContext(UserContext).user;
    const setUser = useContext(UserContext).setUser;
    const [logOffState,setLogOff] = useState(false);
    const [usersInterface,setUsersInterface] = useState(false);
    const [productsInterface,setProductsInterface] = useState(false);
    const [ordersInterface,setOrdersInterface] = useState(false);
    const [cartOpen,setOpenCart] = useState(false);
    const [editUser,setEditUser] = useState(undefined);
    const [orders,setOrders] = useState(undefined);

      useEffect(()=>{
          localStorage.getItem("user") ? setUser(JSON.parse(localStorage.getItem("user"))) : setUser(undefined) ;
      },[setUser]);

    const logOff = () => {
        setLogOff(true);
        setTimeout(()=>{ localStorage.clear();setUser(undefined); setLogOff(false)},2000);
    }

    const getOrders = (userId) => {
        axios.get("/order",{params:{userId:userId}}).then((res)=>{
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
          <div className="w-40px h-40px cursor-pointer m-auto hover-move-up" onClick={()=>{setOpenCart(true)}} onKeyDown={()=>{setOpenCart(true)}} role="button" styling="link" tabIndex={-1}><img alt="cart" src={cart}/></div>
          {user &&
              <UserId>
                  <p>U??ivatel: {user.username}</p>
                  {localStorage.getItem("admin") === "true" &&
                  <div>
                      <p className="text-black">V??tejte v adminovsk??m rozhran??</p>
                      <Button onClick={setUsersInterface}>Spr??va u??ivatel??</Button>
                      <Button onClick={setProductsInterface}>Spr??va produkt??</Button>
                      <Button onClick={()=>{setOrdersInterface(true)}}>Spr??va objedn??vek</Button>
                  </div>}
                  {!user.admin && (
                      <Button onClick={()=>{setEditUser(user)}}>Upravit informace</Button>
                  )}
                  <Button onClick={()=>{getOrders(user._id)}}>M?? objedn??vky</Button>
                  <Button onClick={logOff}>Odhl??sit se</Button>
                  {logOffState && <p className="text-black">Odhla??ov??n??...</p>}
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
                    <OrdersList orders={orders}/>
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
