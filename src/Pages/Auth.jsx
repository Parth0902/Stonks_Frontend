import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
    const [currScreen,setCurrScreen]= useState('Login');
    const navigation= useNavigate();
    const HandleClick1=()=>
    {
        setCurrScreen('Signup');
    }
    const HandleClick2=()=>
    {
        setCurrScreen('Login');
    }
  

  return (
    <div className="fkex-1 flex h-screen w-screen flex-row justify-center items-center">
        {
            currScreen=== 'Login' &&
            <Login HandleClick1={HandleClick1}/>
        }
        {
            currScreen==='Signup' &&
            <Signup HandleClick2={HandleClick2}/>
        }
         <ToastContainer />
    </div>
  )
}

export default Auth