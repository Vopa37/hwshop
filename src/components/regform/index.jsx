import React, { useState,useContext } from "react";
import { Formik, Field } from "formik";
import { Root, Form, Input, Error, Status,Button} from "../styled";
import { UserSchema } from "./regexp";
import emailjs from "emailjs-com";
import {UserContext} from "../../pages";
import Modal from "../modal";
import {AnimatePresence} from "framer-motion";
const axios = require("axios");

const UserAdded = ({message,setMessage}) => (
    <div className="py-8 mx-12">
      <Status error={message.error}>{message.text}</Status>
      <p className="d-none">{setTimeout(()=>{setMessage(undefined)},2000)}</p>
    </div>
)

const RegForm = ({toggle}) => {
  const [message, setMessage] = useState(undefined);
  const setUser = useContext(UserContext).setUser;

  const initialValues = () => ({
    "bot-field": "",
    "form-name": "Order",
    firstname:"",
    lastname:"",
    username: "",
    email:"",
    password:"",
    passwordcheck:"",
    admin:false,
  });

  return (
    <Root>
      <h1 className="text-white mb-6">Zaregistrujte se:</h1>
      <Formik
          validationSchema={UserSchema}
        initialValues={initialValues(true)}
        onSubmit={(values, { resetForm}) => {
          axios.get("http://localhost:5000/user/specific", {params:{username:values.username}} ).then((res)=>{
            if(res.data){
              setMessage({text:"Uživatel již existuje",error:true});
              resetForm();
            }else if(values.password === values.passwordcheck){
              axios.post("http://localhost:5000/user",{
                firstname:values.firstname,
                lastname:values.lastname,
                username:values.username,
                email:values.email,
                password:values.password,
                admin:false,
              }).then((res)=>{
                const service_id = "service_6e0ddbk";
                const template_id = "template_i54wise";
                const user_id = "user_ab6qnlioxTRhjv9pgsAX8";

                const data = {
                    username: values.username,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email:values.email,
                };

                emailjs.send(service_id, template_id, data, user_id);
                localStorage.setItem("user",JSON.stringify(res.data));
                setUser(res.data);
                res.data.admin ? localStorage.setItem("admin","true") : null ;
                setMessage({text:"Uživatel vytvořen",error:false});
                setTimeout(()=>{toggle(false);resetForm()},2000);
              })
            }else{
              setMessage({text:"Hesla se neshodují",error:true});
              resetForm();
            }
          });
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
            <div>
              <Input
                  type="password"
                  id="passwordcheck"
                  name="passwordcheck"
                  placeholder="Heslo znovu:"
                  error={errors.password && touched.password}
              />
              <Error visibility={errors.password && touched.password}>
                {errors.password ? errors.password : "No errors"}
              </Error>
            </div>

            <AnimatePresence>
              {message &&
              <Modal>
                <UserAdded message={message} setMessage={setMessage}/>
              </Modal>
              }
            </AnimatePresence>

            <Button
              type="submit"
            >
              Odeslat
            </Button>
          </Form>
        )}
      />
    </Root>
  );
};

export default RegForm;