import React, { useState, useContext } from "react";
import { Formik, Field } from "formik";
import { Root, Form, Input, Error} from "./styled";
import { UserSchema } from "./regexp";
import {Button} from "../styled";
import {UserContext} from "../homepage";
import Alert from "../alert";
import axios from "axios";
import Modal from "../modal";
import {AnimatePresence} from "framer-motion";

const LogForm = ({toggle}) => {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(undefined);
  const setUser = useContext(UserContext).setUser;
  const initialValues = () => ({
    "bot-field": "",
    "form-name": "Order",
    username:"",
    password:"",
  });

  return (
    <Root>
      <h1 className="text-white mb-6">Přihlásit se:</h1>
      <Formik
          validationSchema={UserSchema}
          initialValues={initialValues(true)}
          onSubmit={(values, { resetForm }) => {
            setSubmitted(true);
          axios.get("/user/specific", {params:{username:values.username,password:values.password}} ).then((res)=>{
            if(res.data){
              resetForm();
              localStorage.setItem("user",JSON.stringify(res.data));
              setUser(res.data);
              localStorage.setItem("admin",res.data.admin);
              setMessage({text:"Přihlášení proběhlo úspěšně",error:false});
              setTimeout(()=>{toggle(false);resetForm()},2000);
            }else{
              setMessage({text:"Uživatelské jméno nebo heslo není správné",error:true});
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

            <AnimatePresence>
              {message &&
              <Modal>
                <Alert message={message} setMessage={setMessage}/>
              </Modal>
              }
            </AnimatePresence>

            <Button
              type="submit"
            >
              {submitted ? "✓" : isSubmitting ? "Odesílání" : "Odeslat"}
            </Button>
          </Form>
        )}
      />
    </Root>
  );
};

export default LogForm;
