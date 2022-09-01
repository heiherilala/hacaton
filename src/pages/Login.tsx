import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavbarHeader } from '../components';
import { ProjectUrl, variant } from '../constants';
import background from "./../assets/images/pexels-rodnae-productions-7841410.jpg";
import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage } from 'formik';
import { getCurrentUser, login, logout } from '../hoooks';
import * as Yup from "yup";
import { IUser } from '../interfaces';
import EventBus from '../hoooks/EventBus';
import { Field, useFormik } from "formik";
import Ranking from './ApplicationList';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import axios from 'axios';



  interface RouterProps {
      history: string;
  }
  
  //type Props = RouteComponentProps<RouterProps>;

  const Login = () => {
    const fielInputRef = useRef<HTMLInputElement>();
    const [activ, setActiv] = useState(true)
    const theFunction = ()=> setActiv(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [token, setToken] = useState<string>("");


  const navigate = ()=>{
    window.location.href=(ProjectUrl+"/");
  }




  const functionLog = (username:string, password:string) => {
    console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGG");
    login(username, password, navigate, setToken).then((re)=>{
    })
  }

  


  
  
  


  return (
    <>
        {
        <div className="contereAllLoginb" style={{
          backgroundImage: 'url('+background+')',
          backgroundSize: "cover",
          height: "100vh",
        }}>
            <div className='connexion'>
              

              <div className='titleLoging'><h2>{"Se connecter"}</h2></div>
              <Form className="contereLoginb container" >
                  <Form.Group className="row " controlId="formBasicText">
                      <Form.Label htmlFor="username" className="col-3 attribut_input">Identifiant: </Form.Label>
                      <Form.Control name="username" className="col-6 custom_color_input" type="text" 
                      placeholder="Entrer l'Identifiant"  value={username} onChange={(e)=>{setUsername(e.target.value)} }/>
                  </Form.Group>

                  <Form.Group className="row " controlId="formBasicPassword">
                      <Form.Label htmlFor="password" className="col-3 attribut_input">Mot de passe: </Form.Label>
                      <Form.Control name="password" className="col-6 custom_color_input" type="password" 
                      placeholder="Entrer le Mot de passe" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                  </Form.Group>


                  <Form.Group className="row justify-content-center" controlId="bouttonFunction1">
                      <div className="col-3"></div>
                      <Button className="col-6 custom_color" onClick={(e)=>{functionLog(username, password)}}>
                          CONNEXION
                      </Button>
                      <div className="col-3"></div>
                  </Form.Group>
              </Form>
            </div>
        </div>
        }
    </>
  );
}

export default Login;
