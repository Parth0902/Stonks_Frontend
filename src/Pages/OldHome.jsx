import React, { useState, useEffect } from "react";
import TechnicalAnalysis from "../Components/CustomCharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomCharts from "../Components/CustomCharts";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from 'js-cookie';
import Ratings from '../Components/Ratings.jsx'
import config from '../config.js'

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
        <div
            className="min-h-[100vh] w-full px-20 flex flex-col items-center gap-7"
            style={{ backgroundColor: "#11191f" }}
        >

            <div className="pt-14 flex flex-col gap-10">
                <h4 className="font-bold text-4xl text-white pt-20 ">Stock Analysis</h4>
                <div className="flex gap-7 flex-wrap">
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="" className="font-medium text-gray-400 text-xl">
                            Stock Symbol
                        </label>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={tickers}
                            sx={{ width: "100%", border: "none" }} // Styling
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Ticker"
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            height: 80,
                                            color: "white",
                                        },
                                        "& fieldset": {
                                            borderColor: "#BDBDBD",
                                        },
                                        "& .MuiInputLabel-root": {
                                            color: "white",
                                        },
                                        "& .MuiInput-underline:before": {
                                            borderBottom: "2px solid gray",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "blue !important", // Border color on hover
                                        },
                                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "blue !important", // Border color when focused
                                        },

                                    }}
                                />
                            )}
                            onChange={(event, newValue) => {
                                setPayload((prev) => ({ ...prev, stk: newValue }));
                            }}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="font-medium text-gray-400 text-xl">
                            Select Stock Exchange
                        </label>
                        <Select
                            labelId="exchange-select-label"
                            value={payLoad.exc}
                            onChange={(event) => {
                                setPayload((prev) => ({ ...prev, exc: event.target.value }));
                            }}
                            label="Stock Exchange"
                            sx={{
                                "& .MuiInputBase-input": {
                                    // Target the input element directly for text color
                                    color: "white",
                                },
                                "& .MuiInputBase-root": {
                                    height: "80px", // Set the height of the input part
                                    color: "white", // Set text color
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#BDBDBD", // Default border color
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue", // Border color on hover
                                },
                                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue", // Border color when focused
                                },
                                "& .MuiSelect-select": {
                                    paddingTop: "28px", // Adjust padding to vertically center the text
                                    paddingBottom: "28px",
                                },
                            }}
                        >
                            <MenuItem value="BSE">BSE</MenuItem>
                            <MenuItem value="NSE">NSE</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className="flex gap-7 flex-wrap">
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="" className="font-medium text-gray-400 text-xl">
                            Select Setup
                        </label>
                        <Select
                            value={payLoad.stp}
                            onChange={(event) => {
                                setPayload((prev) => ({ ...prev, stp: event.target.value }));
                            }}
                            label="Setup"
                            sx={{
                                "& .MuiInputBase-input": {
                                    // Target the input element directly for text color
                                    color: "white",
                                },
                                "& .MuiInputBase-root": {
                                    height: "80px", // Set the height of the input part
                                    color: "white", // Set text color
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#BDBDBD", // Default border color
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue", // Border color on hover
                                },
                                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue", // Border color when focused
                                },
                                "& .MuiSelect-select": {
                                    paddingTop: "28px", // Adjust padding to vertically center the text
                                    paddingBottom: "28px",
                                },
                            }}
                        >
                            <MenuItem value="intraday">intraday</MenuItem>
                            <MenuItem value="swing">swing</MenuItem>
                            <MenuItem value="longterm">long term</MenuItem>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="font-medium text-gray-400 text-xl">
                            Select Chart Image Options
                        </label>
                        <Select
                            labelId="exchange-select-label"
                            value={payLoad.chartImg}
                            onChange={(event) => {
                                setPayload((prev) => ({
                                    ...prev,
                                    chartImg: event.target.value,
                                }));
                            }}
                            label="Stock Exchange"
                            sx={{
                                "& .MuiInputBase-input": {
                                    // Target the input element directly for text color
                                    color: "white",
                                },
                                "& .MuiInputBase-root": {
                                    height: "80px", // Set the height of the input part
                                    color: "white", // Set text color
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#BDBDBD", // Default border color
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue", // Border color on hover
                                },
                                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue", // Border color when focused
                                },
                                "& .MuiSelect-select": {
                                    paddingTop: "28px", // Adjust padding to vertically center the text
                                    paddingBottom: "28px",
                                },
                            }}
                        >
                            <MenuItem value="auto">auto</MenuItem>
                            <MenuItem value="custom">custom</MenuItem>
                        </Select>
                    </div>
                </div>
                {payLoad.chartImg === "custom" && (
                    <CustomCharts
                        setImages={setImages}
                        payLoad={payLoad}
                        images={images}
                    />
                )}


                <div className="flex gap-14 flex-wrap ">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="font-medium text-gray-400 text-xl">
                            Total Capital
                        </label>
                        <TextField
                            onChange={(event) => {
                                setPayload((prev) => ({ ...prev, total_capital: event.target.value }));
                            }}
                            variant="outlined"
                            sx={{
                                "& .MuiInputBase-input": {
                                    color: "white", // Ensures text color in the input field is white
                                },
                                "& .MuiInputBase-root": {
                                    height: "80px", // Set the height of the input part
                                    color: "white", // Ensures text color in the input label and input content is white
                                },
                                "& .MuiInputLabel-root": { // Targeting the label
                                    color: "white", // Change label color to white
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#BDBDBD", // Default border color
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue !important", // Border color on hover
                                },
                                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue !important", // Border color when focused
                                },
                            }}
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="font-medium text-gray-400 text-xl">
                            Trade Capital
                        </label>

                        <TextField
                            onChange={(event) => {
                                setPayload((prev) => ({ ...prev, trade_capital: event.target.value }));
                            }}
                            variant="outlined"
                            sx={{
                                "& .MuiInputBase-input": {
                                    color: "white", // Ensures text color in the input field is white
                                },
                                "& .MuiInputBase-root": {
                                    height: "80px", // Set the height of the input part
                                    color: "white", // Ensures text color in the input label and input content is white
                                },
                                "& .MuiInputLabel-root": { // Targeting the label
                                    color: "white", // Change label color to white
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#BDBDBD", // Default border color
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue !important", // Border color on hover
                                },
                                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue !important", // Border color when focused
                                },
                            }}
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-gray-400 text-xl">
                            Risk Appetite
                        </label>
                        <Select
                            value={payLoad.risk_appetite}
                            onChange={(event) => {
                                setPayload((prev) => ({ ...prev, risk_appetite: event.target.value }));
                            }}
                            sx={{
                                "& .MuiInputBase-input": {
                                    // Target the input element directly for text color
                                    color: "white",
                                },
                                "& .MuiInputBase-root": {
                                    height: "80px", // Set the height of the input part
                                    color: "white", // Set text color
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#BDBDBD", // Default border color
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue", // Border color on hover
                                },
                                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "blue", // Border color when focused
                                },
                                "& .MuiSelect-select": {
                                    paddingTop: "28px", // Adjust padding to vertically center the text
                                    paddingBottom: "28px",
                                },
                            }}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </div>
                </div>

                <button
                    className="py-3 text-center text-white font-medium bg-blue-600 rounded-lgb flex gap-10 justify-center items-center "
                    onClick={handleSubmit}
                >
                    Next
                </button>

                <div className="flex flex-col gap-10">
                    <h4 className="font-bold text-4xl text-white flex gap-10 items-center">
                        Response :{showProgress && <CircularProgress />}
                    </h4>
                    <p className="font-medium text-gray-200 ">{response}</p>
                </div>
                {
                    id && <div className="flex flex-col gap-10">
                        <h4 className="font-bold text-4xl text-white flex gap-10 items-center">
                            Ratings
                        </h4>
                        <div className="flex gap-20">
                        <Ratings value={value} setValue={setValue} />
                        <button
                            className="py-3 px-20 text-center text-white font-medium bg-blue-600 rounded-lgb flex gap-10 justify-center items-center "
                            onClick={handleSubmitRatings}
                        >
                            Submit
                        </button>
                        </div>
                    </div>
                }

                <p className="font-medium text-gray-200 pb-10 pt-16">
                    We are not SEBI registered advisors. All views shared are only for
                    educational purposes. Kindly consult your investment advisor before
                    making any decisions.
                </p>
            </div>
        </div>
    );
};

export default Home;
