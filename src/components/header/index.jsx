import React, {useEffect, useState} from "react";
import {
    Root,
  Title,
  WidthWrapper, Button,UserId
} from "./styled";

import Modal from "../modal/";

import RegForm from "../regform";
import LogForm from "../logform";
import ManageUsers from "../manageusers";
import ManageProducts from "../manageproducts";
import {AnimatePresence} from "framer-motion";
const Header = () => {
    const [reg,setReg] = useState(false);
    const [log,setLog] = useState(false);
    const [user,setUser] = useState(undefined);
    const [logOffState,setLogOff] = useState(false);
    const [usersInterface,setUsersInterface] = useState(false);
    const [productsInterface,setProductsInterface] = useState(false);
  useEffect(()=>{
      setUser(localStorage.getItem("user"));
  });

    const logOff = () => {
        setLogOff(true);
        setTimeout(()=>{ localStorage.clear();setUser(undefined); setLogOff(false)},2000);
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
          {user &&
              <UserId>
                  <p>Uživatel: {user}</p>
                  {localStorage.getItem("admin") &&
                  <div>
                      <p className="text-black">Vítejte v adminovském rozhraní</p>
                      <Button onClick={setUsersInterface}>Správa uživatelů</Button>
                      <Button onClick={setProductsInterface}>Správa produktů</Button>
                  </div>}
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
        </div>
      </div>
      </WidthWrapper>
    </Root>
  );
};

export default Header;
