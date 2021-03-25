import React from "react";
import {Status,AlertWrapper} from "./styled";
const Alert = ({message,setMessage}) => {
    return(
        <AlertWrapper>
            <Status error={message.error}>{message.text}</Status>
            <p className="d-none">{setTimeout(()=>{setMessage(undefined)},2000)}</p>
        </AlertWrapper>
    );
}

export default Alert;