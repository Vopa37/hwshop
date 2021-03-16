import React, {useState, useContext} from "react";
import axios from "axios";
import {Button} from "../styled";
import Modal from "../modal";
import {AnimatePresence} from "framer-motion";
import ItemForm from "../itemform";
import {ProductsContext} from "../../pages";
import EditProduct from "./editproduct";
import Confirm from "../confirm";
import {Status} from "../regform/styled";

const ProductDeleted = ({message,setMessage}) => (
    <div className="py-8 mx-12">
        <Status error={message.error}>{message.text}</Status>
        <p className="d-none">{setTimeout(()=>{setMessage(undefined);setTimeout(()=>{document.location.href="/";},500)},2000)}</p>
    </div>
)

const ManageProducts = () => {
    const products = useContext(ProductsContext).products;
    const [message,setMessage] = useState(undefined);
    const [productForm,setProductForm] = useState(false);
    const [editProduct,setEditProduct] = useState(undefined);
    const [deleteConfirm,setDeleteConfirm] = useState(false);


    const deleteProduct = (id) => {
        axios.delete('http://localhost:5000/product',{params:{id:id}}).then((res)=>{
            setMessage(res.data);
        });
    }


    return(
        <div className="w-80 m-auto">
            <h1 className="text-center text-white">Správa produktů</h1>
            <Button className="position-relative mx-0 my-6" style={{left:"50%",transform:"translateX(-50%)"}} onClick={()=>{setProductForm(true)}}>Přidat produkt</Button>
            {message &&
            <AnimatePresence>
                {message &&
                <Modal>
                    <ProductDeleted message={message} setMessage={setMessage}/>
                </Modal>
                }
            </AnimatePresence>
            }
                <AnimatePresence>
                    {productForm &&
                    <Modal toggle={setProductForm}>
                        <ItemForm/>
                    </Modal>
                    }
                </AnimatePresence>
            {products && products.map((product,index)=>(
                <div className="text-black w-100 bg-white my-4 d-flex" key={index}>
                    <div className="w-50">
                        <p className="text-center m-0 p-0"> <span className="fw-700">ID:</span> {product._id}</p>
                        <p className="text-center m-0 p-0"> <span className="fw-700">Název:</span> {product.name}</p>
                        <p className="text-center m-0 p-0"> <span className="fw-700">Cena:</span> {product.price}</p>
                        <div className="mx-auto my-4 w-100px h-100px ">
                        <img src={product.image} alt={product.image} className="rounded w-100 h-100"/>
                        </div>
                    </div>
                    <div className="w-50 d-flex flex-column justify-content-center">
                        <Button className="w-50 m-auto" onClick={()=>{setEditProduct(product)}}>Upravit</Button>
                    </div>

                    <div className="w-50 d-flex flex-column justify-content-center">
                        <Button className="w-50 m-auto" onClick={()=>{setDeleteConfirm(true)}}>Odstranit</Button>
                    </div>

                    <AnimatePresence>
                        {editProduct &&
                        <Modal toggle={setEditProduct}>
                            <EditProduct product={editProduct} toggle={setEditProduct}/>
                        </Modal>
                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {deleteConfirm &&
                        <Modal>
                            <Confirm title="Opravdu chcete tento produkt smazat?" accept={()=>{deleteProduct(product._id);setDeleteConfirm(false)}} decline={()=>{setDeleteConfirm(false)}}/>
                        </Modal>
                        }
                    </AnimatePresence>
                </div>
            ))}

        </div>
    );
}

export default ManageProducts;