import React,{useState} from "react";
import Google from "../assets/icons8-google.svg";
import axios from 'axios'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from "react-router-dom";
import LoginGraphic from '../assets/LoginGraphic.png'
import config from '../config.js'

const Login = ({HandleClick1}) => {
  const navigation= useNavigate();
  const [payload,setPayload]=useState({
    email:"",
    password:"",
  });


  const handleSubmit= async()=>
  {
    try{
      const response = await fetch(`${config.apiDomain}/api/login`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const ack = await response.json();
      console.log(ack);
      if(response.status===200){
        toast.success("Login Successfull");
        navigation('/');
      }
     else{
        toast.warn(ack.data.error);
      }       
     
    }
    catch(err){
      toast.error("Error try after some time");
      console.log(err);
    }

  }


  return (
    <div className="flex items-center border">
      <div className="flex flex-col gap-5 px-20 py-5 ">
        <h1 className="text-center font-bold text-3xl">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="border border-black  px-5 py-2  rounded-md"
          onChange={e=>setPayload(prev=>({...prev,email:e.target.value}))}
        />
        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Password"
            className="border border-black px-5 py-2 rounded-md"
            onChange={e=>setPayload(prev=>({...prev,password:e.target.value}))}
          />
          <p>forgot password ?</p>
        </div>
        <button className=" py-2 border border-black bg-black text-white rounded-md" onClick={handleSubmit}>
          Submit
        </button>
        <div className="flex flex-col gap-7">
        <p className="">
          Dont have an Account? <span className="font-semibold text-lg text-red-500 cursor-pointer" onClick={HandleClick1}>Register Here</span>
        </p>
        </div>

      </div>
      <div
        className="flex justify-center items-center border-l-2 "
        style={{ width: "600px", height: "550px" }}
      >
        <img src={LoginGraphic} alt="" />
      </div>
    </div>
  );
};

export default Login;
