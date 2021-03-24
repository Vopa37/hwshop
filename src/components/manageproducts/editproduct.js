import React, {useState} from "react";
import axios from "axios";
import {Error, Form, Input, Root} from "../itemform/styled";
import {Button, ModalAlert} from "../styled";
import {Field, Formik} from "formik";
import {ProductSchema} from "../itemform/regexp";
import Modal from "../modal";

const EditProduct = ({product}) => {
    const [message,setMessage] = useState(undefined);
    const initialValues = () => ({
        "bot-field": "",
        "form-name": "Order",
        name: product.name,
        price: product.price,
        description:product.description,
        image:product.image
    });

    return (
        <Root>
            <Formik
                validationSchema={ProductSchema}
                initialValues={initialValues(true)}
                onSubmit={(values, { resetForm}) => {
                    axios.put("http://localhost:5000/product",{
                        _id: product._id,
                        name:values.name,
                        description:values.description,
                        price:values.price,
                        image:values.image
                    }).then(()=>{
                        setMessage({text:"Změna produktu proběhla úspěšně",error:false});
                        resetForm();
                    })
                }}
                render={({ handleSubmit, errors, touched}) => (
                    <Form
                        onSubmit={handleSubmit}
                        name="Order"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                    >
                        <Field type="hidden" name="form-name" />
                        <Field type="hidden" name="bot-field" />

                        <div>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Název:"
                                error={errors.name && touched.name}
                            />
                            <Error visibility={errors.name && touched.name}>
                                {errors.name ? errors.name : "No errors"}
                            </Error>
                        </div>
                        <div>
                            <Input
                                type="textarea"
                                id="description"
                                name="description"
                                placeholder="Popis:"
                                error={errors.description && touched.description}
                            />
                            <Error visibility={errors.description && touched.description}>
                                {errors.description ? errors.description : "No errors"}
                            </Error>
                        </div>
                        <div>
                            <Input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Cena:"
                                error={errors.price && touched.price}
                            />
                            <Error visibility={errors.price && touched.price}>
                                {errors.price ? errors.price : "No errors"}
                            </Error>
                        </div>
                        <div>
                            <Input
                                type="url"
                                id="image"
                                name="image"
                                placeholder="URL na obrázek:"
                                error={errors.image && touched.image}
                            />
                            <Error visibility={errors.image && touched.image}>
                                {errors.image ? errors.image : "No errors"}
                            </Error>
                        </div>

                        <Button
                            type="submit"
                        >
                            Odeslat
                        </Button>

                        {message &&
                        <Modal>
                            <ModalAlert message={message} setMessage={setMessage}/>
                        </Modal>
                        }

                    </Form>
                )}
            />
        </Root>
    );
}

export default EditProduct;