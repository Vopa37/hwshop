import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {Button} from "../styled";
import {Status} from "../logform/styled";
import Modal from "../modal";
import EditUser from "./edituser";
import {AnimatePresence} from "framer-motion";
import {UserContext} from "../../pages";

const ManageUsers = ({toggle}) => {
    const users = useContext(UserContext).users;
    const setUsers = useContext(UserContext).setUsers;
    const [message,setMessage] = useState(undefined);
    const [editUser,setEditUser] = useState(undefined);

    useEffect(()=>{
        axios.get('http://localhost:5000/user').then((res)=>{
            setUsers(res.data);
        });
    },[users])

    const deleteUser = (id) => {
        axios.delete("http://localhost:5000/order",{params:{userId:id}});
        axios.get('http://localhost:5000/user/remove',{params:{id:id}}).then((res)=>{
            setMessage(res.data);
        });
    }

    return(
       <div className="w-80 m-auto">
           <h1 className="text-center text-white">Správa uživatelů</h1>
           {message && <Status error={message.error} className="text-center">{message.text}</Status>}
            { users && users.map((user,index)=>(
                <div className="text-black w-100 bg-white my-4 d-flex" key={index}>
                    <div className="w-50">
                        <p className="text-center m-0 p-0"> <span className="fw-700">ID:</span> {user._id}</p>
                        <p className="text-center m-0 p-0"> <span className="fw-700">Jméno:</span> {user.firstname}</p>
                        <p className="text-center m-0 p-0"> <span className="fw-700">Příjmení:</span> {user.lastname}</p>
                        <p className="text-center m-0 p-0"> <span className="fw-700">E-mail:</span> {user.email}</p>
                    </div>

                    <div className="w-50 d-flex flex-column justify-content-center">
                        <Button className="w-50 m-auto" onClick={()=>{setEditUser(user)}}>Upravit</Button>
                    </div>

                    <div className="w-50 d-flex flex-column justify-content-center">
                        {!user.admin && <Button className="w-50 m-auto" onClick={()=>{deleteUser(user._id)}}>Odstranit</Button> }
                    </div>

                    <AnimatePresence>
                        {editUser &&
                        <Modal toggle={setEditUser}>
                            <EditUser admin={true} user={editUser} toggle={setEditUser}/>
                        </Modal>
                        }
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

export default ManageUsers;