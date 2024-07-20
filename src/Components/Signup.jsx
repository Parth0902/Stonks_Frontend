import React, { useState } from 'react'
import Google from "../assets/icons8-google.svg";
import { toast } from 'react-toastify';
import axios from 'axios';
import SignUpGraphic from '../assets/SignUpGraphic.png'
import { useNavigate,Link } from "react-router-dom";
import config from '../config.js'

const Signup = ({ HandleClick2 }) => {
    const navigation= useNavigate();
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });
    const [confirmPass, setConfirmPass] = useState("");

    const handleSubmit = async () => {
        if (payload.password !== confirmPass) {
            toast.warn("password and confirm password doesn't match");
        }
        else {
            try{
                const response = await fetch(`${config.apiDomain}/api/register`, {
                  credentials: 'include',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(payload)
                });
          
                const ack = await response.json();
                console.log(ack);
                console.log(response.status);
                if(response.status===201){
                  toast.success("Register Successfull");
                  navigation('/login');
                }
               else{
                  toast.warn(ack.msg);
                }       
               
              }
              catch(err){
                toast.error("Error try after some time");
                console.log(err);
              }
        }
    }

    return (
        <div className="flex items-center border">
            <div className="flex flex-col gap-5 px-20 py-5 ">
                <h1 className="text-center font-bold text-3xl">SignUp</h1>
                <input
                    type="text"
                    placeholder="email"
                    className="border border-black  px-5 py-2  rounded-md"
                    onChange={e => setPayload(prev => ({ ...prev, email: e.target.value }))}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border border-black px-5 py-2 rounded-md"
                    onChange={e => setPayload(prev => ({ ...prev, password: e.target.value }))}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="border border-black px-5 py-2 rounded-md"
                    onChange={e => setConfirmPass(e.target.value)}
                />

                <button className=" py-2 border border-black bg-black text-white rounded-md" onClick={handleSubmit}>
                    Submit
                </button>
                <div className="flex flex-col gap-7">
                    <p className="">
                        Already have an Account? <span className="font-semibold text-lg text-red-500 cursor-pointer" onClick={HandleClick2}>Login Here</span>
                    </p>
                </div>

            </div>
            <div
                className="flex justify-center items-center border-l-2 "
                style={{ width: "600px", height: "550px" }}
            >
                <img src={SignUpGraphic} alt="" />
            </div>
        </div>
    )
}

export default Signup
