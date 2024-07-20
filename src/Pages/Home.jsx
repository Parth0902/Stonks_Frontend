import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import CustomCharts from "../Components/CustomCharts";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from 'js-cookie';
import Ratings from '../Components/Ratings.jsx'
import config from '../config.js'
import SideBar from "../Components/SideBar.jsx";
import { Button } from "@mui/material";

const Home = () => {
    const navigation = useNavigate();
    const [response, setResponse] = useState(null);
    const [showProgress, setshowProgress] = useState(false);
    const [images, setImages] = useState([]);
    const [id, setId] = useState(null);
    const [value, setValue] = useState(2);

    const [payLoad, setPayload] = useState({
        stk: "",
        exc: "NSE",
        stp: "intraday",
        chartImg: "auto",
        total_capital: 0,
        trade_capital: 0,
        risk_appetite: "low",

    });

    useEffect(() => {
        // const token= sessionStorage.getItem('token');
        const check = async () => {
            try {
                const res = await fetch(`${config.apiDomain}/api/check-auth`, {
                    credentials: 'include',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(res);
                if (res.status !== 200) {
                    navigation('/login');
                }
            } catch (error) {
                console.log("check-auth")
                console.error(error);
            }
        }
        check();
    }, [])

    const tickers = [
        "ADANIENT",
        "ADANIPORTS",
        "APOLLOHOSP",
        "ASIANPAINT",
        "AXISBANK",
        "BAJAJ-AUTO",
        "BAJAJFINSV",
        "BAJFINANCE",
        "BHARTIARTL",
        "BPCL",
        "BRITANNIA",
        "CIPLA",
        "COALINDIA",
        "DIVISLAB",
        "DRREDDY",
        "EICHERMOT",
        "GRASIM",
        "HCLTECH",
        "HDFCBANK",
        "HDFCLIFE",
        "HEROMOTOCO",
        "HINDALCO",
        "HINDUNILVR",
        "ICICIBANK",
        "INDUSINDBK",
        "INFY",
        "ITC",
        "JSWSTEEL",
        "KOTAKBANK",
        "LT",
        "LTIM",
        "M&M",
        "MARUTI",
        "NESTLEIND",
        "NTPC",
        "ONGC",
        "POWERGRID",
        "RELIANCE",
        "SBILIFE",
        "SBIN",
        "SHRIRAMFIN",
        "SUNPHARMA",
        "TATACONSUM",
        "TATAMOTORS",
        "TATASTEEL",
        "TCS",
        "TECHM",
        "TITAN",
        "ULTRACEMCO",
        "WIPRO",
    ];

    const StockExchange=[
        "NSE",
        "BSE"
    ]

    const handleSubmitRatings = async () => {
        const csrfToken = Cookies.get('csrf_access_token');
        console.log(value);
        const formData = new FormData();
        formData.append("rating", value);
        formData.append("logId", id);
        const response = await fetch(`${config.apiDomain}/api/feedback`, {
            credentials: 'include',
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            method: "POST",
            body: formData,
        });
        const ack = await response.json();
        if (response.status === 200) {
            console.log(ack);
            alert("Feedback Submitted");
            toast.success("Feedback Submitted");
        } else {
            toast.error("error");
        }
    };

    const handleSubmit = async () => {
        const csrfToken = Cookies.get('csrf_access_token');
        console.log(payLoad);
        const formData = new FormData();
        console.log(images);
        for (let i = 0; i < 2; i++) {
            formData.append(`img${i + 1}`, images[i]);
        }
        formData.append("stk", payLoad.stk);
        formData.append("exc", payLoad.exc);
        formData.append("stp", payLoad.stp);
        formData.append("trade_capital", payLoad.trade_capital);
        formData.append("total_capital", payLoad.total_capital);
        formData.append("risk_appetite", payLoad.risk_appetite);
        console.log([...formData]);
        if (payLoad.chartImg === "auto") {
            setshowProgress(true);
            const response = await fetch(`${config.apiDomain}/api/technical`, {
                credentials: 'include',
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                method: "POST",
                body: formData,
            });
            const ack = await response.json();
            console.log(ack);
            if (ack) {
                setshowProgress(false);
                setResponse(ack.data);
                setId(ack.logId);
            } else {
                toast.error("error");
            }
        } else {
            setshowProgress(true);
            const response = await fetch(`${config.apiDomain}/api/custom`, {
                credentials: 'include',
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                method: "POST",
                body: formData,
            });

            const ack = await response.json();
            console.log(ack);
            if (ack) {
                setshowProgress(false);
                setResponse(ack.data);
                setId(ack.logId);
            } else {
                toast.error("error");
            }
        }
    };

    return (
        <div className="lg:flex overflow-x-hidden">
            <SideBar />
            <div className="bg-[#1B1B1E] w-full pt-5">
                <div className="flex gap-3 justify-center">

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={StockExchange}
                        sx={{ 
                            width: 160,
                            borderRadius:2,
                            border:"none",
                            backgroundColor:"rgba(219, 153, 229, 0.08)",
                            color:"#fff",
                            "& .MuiInputBase-input": {
                                color: "white", // Ensures text color in the input field is white
                            },
                            "& .MuiInputLabel-root": { // Targeting the label
                                color: "white", // Change label color to white
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "none", // Default border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E!important", // Border color on hover
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E !important", // Border color when focused
                            },
                            "& .MuiAutocomplete-popupIndicator": {
                                color: "#65D16E", // Color of the dropdown arrow icon
                            },
                            "& .MuiAutocomplete-clearIndicator": {
                                color: "#65D16E", // Color of the cancel (X) icon
                            },

                            
                          }}
                        renderInput={(params) => <TextField {...params} label="exchange" />}
                        onChange={(event, newValue) => {
                            setPayload((prev) => ({ ...prev,   exc: newValue }));
                        }}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={tickers}
                        sx={{  
                            width: 160,
                            borderRadius:2,
                            border:"none",
                            backgroundColor:"rgba(219, 153, 229, 0.08)",
                            color:"#fff",
                            "& .MuiInputBase-input": {
                                color: "white", // Ensures text color in the input field is white
                            },
                            "& .MuiInputLabel-root": { // Targeting the label
                                color: "white", // Change label color to white
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "none",// Default border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E!important", // Border color on hover
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E !important", // Border color when focused
                            },
                            "& .MuiAutocomplete-popupIndicator": {
                                color: "#65D16E", // Color of the dropdown arrow icon
                            },
                            "& .MuiAutocomplete-clearIndicator": {
                                color: "#65D16E", // Color of the cancel (X) icon
                            },

                        }} // Styling
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="ticker"
                            />
                        )}
                        onChange={(event, newValue) => {
                            setPayload((prev) => ({ ...prev, stk: newValue }));
                        }}
                    />


                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={[
                            "intraday",
                            "swing",
                            "longterm"
                        ]}
                        sx={{ 
                            width: 160,
                            borderRadius:2,
                            border:"none",
                            backgroundColor:"rgba(219, 153, 229, 0.08)",
                            color:"#fff",
                            "& .MuiInputBase-input": {
                                color: "white", // Ensures text color in the input field is white
                            },
                            "& .MuiInputLabel-root": { // Targeting the label
                                color: "white", // Change label color to white
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "none", // Default border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E!important", // Border color on hover
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E !important", // Border color when focused
                            },
                            "& .MuiAutocomplete-popupIndicator": {
                                color: "#65D16E", // Color of the dropdown arrow icon
                            },
                            "& .MuiAutocomplete-clearIndicator": {
                                color: "#65D16E", // Color of the cancel (X) icon
                            },


                            
                          }}
                        renderInput={(params) => <TextField {...params} label="setpup" />}
                        onChange={(event, newValue) => {
                            setPayload((prev) => ({ ...prev,  stp: newValue }));
                        }}
                    />

                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={[
                            "low",
                            "medium",
                            "high"
                        ]}
                        sx={{ 
                            width: 160,
                            borderRadius:2,
                            border:"none",
                            backgroundColor:"rgba(219, 153, 229, 0.08)",
                            color:"#fff",
                            "& .MuiInputBase-input": {
                                color: "white", // Ensures text color in the input field is white
                            },
                            "& .MuiInputLabel-root": { // Targeting the label
                                color: "white", // Change label color to white
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "none", // Default border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E!important", // Border color on hover
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E !important", // Border color when focused
                            },
                            "& .MuiAutocomplete-popupIndicator": {
                                color: "#65D16E", // Color of the dropdown arrow icon
                            },
                            "& .MuiAutocomplete-clearIndicator": {
                                color: "#65D16E", // Color of the cancel (X) icon
                            },


                            
                          }}
                        renderInput={(params) => <TextField {...params} label="Risk" />}
                        onChange={(event, newValue) => {
                            setPayload((prev) => ({ ...prev,risk_appetite: newValue }));
                        }}
                    />

                    <TextField
                        onChange={(event) => {
                            setPayload((prev) => ({ ...prev, total_capital: event.target.value }));
                        }}
                        variant="outlined"
                        label="Total Capital"
                        sx={{
                            width: 160,
                            borderRadius:2,
                            border:"none",
                            backgroundColor:"rgba(219, 153, 229, 0.08)",
                            color:"white",
                            "& .MuiInputBase-input": {
                                color: "white", // Ensures text color in the input field is white
                            },
                            "& .MuiInputLabel-root": { // Targeting the label
                                color: "white", // Change label color to white
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E", // Default border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E!important", // Border color on hover
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E !important", // Border color when focused
                            },
                            "& .MuiAutocomplete-clearIndicator": {
                                color: "#65D16E", // Color of the cancel (X) icon
                            },

                        }}
                    />

                    <TextField
                        onChange={(event) => {
                            setPayload((prev) => ({ ...prev, trade_capital: event.target.value }));
                        }}
                        variant="outlined"
                        label="Trade Capital"
                        sx={{
                            width: 160,
                            borderRadius:2,
                            border:"none",
                            backgroundColor:"rgba(219, 153, 229, 0.08)",
                            color:"white",
                            "& .MuiInputBase-input": {
                                color: "white", // Ensures text color in the input field is white
                            },
                            "& .MuiInputLabel-root": { // Targeting the label
                                color: "white", // Change label color to white
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E", // Default border color
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E!important", // Border color on hover
                            },
                            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#65D16E !important", // Border color when focused
                            },
                            "& .MuiAutocomplete-clearIndicator": {
                                color: "#65D16E", // Color of the cancel (X) icon
                            },

                        }}
                    />
                    <button className="bg-[#65D16E] rounded-xl font-Prompt text-[Content surface] font-medium text-lg w-[160px] h-[60px] flex justify-center items-center">
                        Analyze
                    </button>
                </div>


            </div>
        </div>
    );
};

export default Home;
