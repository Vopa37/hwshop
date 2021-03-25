import React from "react";

import { PageRoot } from "../components/styled";

import Homepage from "../components/homepage";

import axios from "axios";


if(process.env.NODE_ENV === "development"){
    axios.defaults.baseURL = "http://localhost:5000";
}else{
    axios.defaults.baseURL = "https://hwshop.herokuapp.com";
}


const IndexPage = () => {

    return(
        <PageRoot>
            <Homepage/>
        </PageRoot>
    );
}

export default IndexPage;
