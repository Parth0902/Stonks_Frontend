import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CustomCharts = ({ payLoad, setImages,images  }) => {

  
    const [CandlestickTimeFrame, setCandlestickTimeFrame] = useState([]);

    useEffect(() => {
        setCandlestickTimeFrame(data[payLoad.stp]);
    }, [payLoad.stp]);
    console.log(CandlestickTimeFrame);

    const data = {
        intraday: [
            "5m",
            "15m",
          
        ],
        swing: [
            "1D",
            "1W",
        ],
        longterm: [
            "1W",
            "1M"
        ]
    }



    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const updatedImages = [...images];
        updatedImages.push(file);
        setImages(updatedImages);
    };

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-10 '>
                {
                    CandlestickTimeFrame.map((timeFrame, index) => (
                        <div className='flex justify-between w-full' key={index}>
                            <div className='flex flex-col gap-5'>
                                <label htmlFor="customFile" className='font-medium text-gray-400 text-xl'>Upload Candlestick Chart Image</label>
                                <div className="file-upload-wrapper">
                                    <input type="file" id="customFile" hidden onChange={e => handleImageUpload(e)} />
                                    <label htmlFor="customFile" className="file-upload-button">Choose a file</label>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <label htmlFor="timeFrame" className='font-medium text-gray-400 text-xl'>Candlestick Time Frame </label>
                                <input id="timeFrame" name="timeFrame" value={timeFrame} className='h-10 px-10 bg-transparent border-2 border-gray-400 font-medium text-gray-400' disabled />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default CustomCharts;
