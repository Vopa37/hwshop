import React, { useState, useContext } from "react";
import { Formik, Field } from "formik";
import { UserSchema } from "./regexp";
import {Button,ModalAlert,Root, Form, Input, Error} from "../styled";
import {UserContext} from "../../pages";
import Modal from "../modal";

const axios = require("axios");

const LogForm = ({toggle}) => {
  const [message, setMessage] = useState(undefined);
  const setUser = useContext(UserContext).setUser;
  const initialValues = () => ({
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
          axios.get("http://localhost:5000/user/specific", {params:{username:values.username,password:values.password}} ).then((res)=>{
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
            name="Login"
          >
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

            {message &&
            <Modal>
              <ModalAlert message={message} setMessage={setMessage} redirectDisable/>
            </Modal>
            }

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

export default LogForm;
