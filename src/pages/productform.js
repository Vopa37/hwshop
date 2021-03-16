import React from "react";

import { Root, MenuTarget } from "../components/styled";

import Header from "../components/header/.";
import ItemForm from "../components/itemform";
import Footer from "../components/footer/.";


const ProductFormPage = () => (
    <Root>
        <MenuTarget id="Home" />
        <Header />
        <ItemForm />
        <Footer />
    </Root>
);

export default ProductFormPage;
