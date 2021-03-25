import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {Button} from "../styled";
import Modal from "../modal";
import EditUser from "./edituser";
import {AnimatePresence} from "framer-motion";
import {UserContext} from "../homepage";
import Alert from "../alert";
import {UserInfo} from "./styled";

const ManageUsers = () => {
    const users = useContext(UserContext).users;
    const setUsers = useContext(UserContext).setUsers;
    const [message,setMessage] = useState(undefined);
    const [editUser,setEditUser] = useState(undefined);

    useEffect(()=>{
        axios.get('/user').then((res)=>{
            setUsers(res.data);
        });
    },[setUsers])

    const deleteUser = (id,setUsers) => {
        axios.delete("/order",{params:{userId:id}});
        axios.delete('/user/remove',{params:{id:id}}).then((res)=>{
            setMessage(res.data);
            axios.get('/user').then((res)=>{
                setUsers(res.data);
            });
        });

    }

    return(
       <div className="w-80 m-auto">
           <h1 className="text-center text-white">Správa uživatelů</h1>
           <AnimatePresence>
               {message &&
               <Modal>
                   <Alert message={message} setMessage={setMessage}/>
               </Modal>
               }
           </AnimatePresence>
            { users && users.map((user,index)=>(
                <UserInfo key={index}>
                    <div className="w-full md:w-50">
                        <p className="text-center m-0 p-0"> <span className="fw-700">ID:</span> {user._id}</p>
                        <p className="text-center m-0 p-0"> <span className="fw-700">Jméno:</span> {user.firstname}</p>
                        <p className="text-center m-0 p-0"> <span className="fw-700">Příjmení:</span> {user.lastname}</p>
                        <p className="text-center m-0 p-0"> <span className="fw-700">E-mail:</span> {user.email}</p>
                    </div>

                    <div className="md:w-50 d-flex flex-column justify-content-center">
                        <Button onClick={()=>{setEditUser(user)}}>Upravit</Button>
                    </div>

                    <div className="md:w-50 d-flex flex-column justify-content-center">
                        {!user.admin && <Button onClick={()=>{deleteUser(user._id,setUsers)}}>Odstranit</Button> }
                    </div>

                    <AnimatePresence>
                        {editUser &&
                        <Modal toggle={setEditUser}>
                            <EditUser admin={true} user={editUser} toggle={setEditUser}/>
                        </Modal>
                        }
                    </AnimatePresence>
                </UserInfo>
            ))}
        </div>
    );
}

export default ManageUsers;