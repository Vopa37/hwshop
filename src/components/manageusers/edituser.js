import React, {useContext, useState} from "react";
import axios from "axios";
import {Error, Form, Input, Root, Checkbox} from "../itemform/styled";
import {Field, Formik} from "formik";
import {UserSchema} from "../regform/regexp";
import {Button} from "../styled";
import {UserContext} from "../../pages";

const EditProduct = ({admin,user,toggle}) => {
    const setUsers = useContext(UserContext).setUsers;
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);

    const initialValues = () => ({
        "bot-field": "",
        "form-name": "Order",
        firstname:user.firstname,
        lastname:user.lastname,
        username: user.username,
        email:user.email,
        password:user.password,
        admin:user.admin,
    });

    const showSuccessFormSubmit = (resetForm) => {
        setSuccess(true);
        setTimeout(()=>{setSuccess(false);resetForm();window.location = "/";},2000);
    }

    return (
        <Root>
            <Formik
                validationSchema={UserSchema}
                initialValues={initialValues(true)}
                onSubmit={(values, { resetForm, setValues }) => {
                    axios.put("http://localhost:5000/user",{
                        _id: user._id,
                        firstname:values.firstname,
                        lastname:values.lastname,
                        username: values.username,
                        email:values.email,
                        password:values.password,
                        admin:values.admin,
                    }).then((res)=>{
                        localStorage.setItem("user",JSON.stringify(res.data));
                        axios.get("http://localhost:5000/user").then((res)=>{
                            setUsers(res.data);
                        })
                        showSuccessFormSubmit(resetForm);
                    })
                }}
                render={({ handleSubmit, errors, touched, isSubmitting }) => (
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
                                id="firstname"
                                name="firstname"
                                placeholder="Jméno:"
                                error={errors.firstname && touched.firstname}
                            />
                            <Error visibility={errors.firstname && touched.firstname}>
                                {errors.firstname ? errors.firstname : "No errors"}
                            </Error>
                        </div>
                        <div>
                            <Input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Příjmení:"
                                error={errors.lastname && touched.lastname}
                            />
                            <Error visibility={errors.lastname && touched.lastname}>
                                {errors.lastname ? errors.lastname : "No errors"}
                            </Error>
                        </div>
                        <div>
                            <Input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Uživatelské jméno:"
                                error={errors.username && touched.username}
                            />
                            <Error visibility={errors.username && touched.username}>
                                {errors.username ? errors.username : "No errors"}
                            </Error>
                        </div>
                        <div>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email:"
                                error={errors.email && touched.email}
                            />
                            <Error visibility={errors.email && touched.email}>
                                {errors.email ? errors.email : "No errors"}
                            </Error>
                        </div>
                        <div>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Heslo:"
                                error={errors.password && touched.password}
                            />
                            <Error visibility={errors.password && touched.password}>
                                {errors.password ? errors.password : "No errors"}
                            </Error>
                        </div>
                        {admin && (
                            <div>
                                <p className="text-white">Admin:</p>
                                <Checkbox
                                    type="checkbox"
                                    id="admin"
                                    name="admin"
                                />
                            </div>
                        )}

                        <Button
                            type="submit"
                        >
                            {submitted ? "✓" : isSubmitting ? "Odesílání" : "Odeslat"}
                        </Button>

                        {success ? <p>OK</p> : null}
                    </Form>
                )}
            />
        </Root>
    );
}

export default EditProduct;